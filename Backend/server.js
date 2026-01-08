require("dotenv").config();
const app = require("./src/app");
const http = require("http");
const { Server } = require("socket.io");
const Product = require("./src/models/product.model");
const connectDB = require("./src/db/db");

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

/**
 * 🔒 END AUCTION (single source of truth)
 */
const endAuction = async (productId) => {
  const product = await Product.findById(productId);

  if (!product || product.status !== "live") return;

  product.status = "sold";
  product.winner = product.highestBidder;
  product.finalPrice = product.currentBid;

  await product.save();

  io.to(productId).emit("auction-ended", {
    winnerId: product.winner,
    finalBid: product.finalPrice,
  });

  console.log(`🏁 Auction ended for product ${productId}`);
};

/**
 * ⏱️ AUTO END AUCTIONS (every 5 seconds)
 */
setInterval(async () => {
  const expiredAuctions = await Product.find({
    status: "live",
    auctionEndTime: { $lte: new Date() },
  });

  // console.log("setIntervel");

  for (const product of expiredAuctions) {
    await endAuction(product._id);
  }
}, 5000);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  /**
   * JOIN AUCTION ROOM
   */
  socket.on("join-auction", (productId) => {
    socket.join(productId);
    console.log(`User joined auction: ${productId}`);
  });

  /**
   * PLACE BID
   */
  socket.on("place-bid", async ({ productId, amount, userId, username }) => {
    try {
      const product = await Product.findById(productId);

      if (!product || !product.isAuction) return;

      if (product.status !== "live") {
        socket.emit("bid-error", "Auction is not live");
        return;
      }

      if (Date.now() > new Date(product.auctionEndTime).getTime()) {
        console.log("Now Time's Up!! better luck next time");
        await endAuction(productId);
        socket.emit("bid-error", "Auction has ended");
        return;
      }

      const minAllowedBid = product.currentBid + product.minimumBidIncrement;

      if (amount < minAllowedBid) {
        socket.emit("bid-error", `Minimum bid should be ₹${minAllowedBid}`);
        return;
      }

      // ✅ ACCEPT BID
      product.currentBid = amount;
      product.highestBidder = userId;
      product.totalBids += 1;

      await product.save();

      // 🔥 BROADCAST UPDATE
      io.to(productId).emit("bid-updated", {
        currentBid: product.currentBid,
        totalBids: product.totalBids,
        lastBidBy: userId,
        lastBidUsername: username,
      });
    } catch (error) {
      console.error(error);
      socket.emit("bid-error", "Something went wrong");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log(" Server running on port 3000");
});
