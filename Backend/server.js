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

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  

  socket.on("join-auction", (productId) => {
    socket.join(productId);
    console.log(`User joined auction: ${productId}`);
  });

  // PLACE BID
  socket.on("place-bid", async ({ productId, amount, userId }) => {
    console.log("Your product id", productId);
    try {
      const product = await Product.findById(productId);
      console.log("your product", product);

      if (!product || !product.isAuction) return;

      if (product.status !== "live") {
        socket.emit("bid-error", "Auction is not live");
        return;
      }

      const minAllowedBid = product.currentBid + product.minimumBidIncrement;

      if (amount < minAllowedBid) {
        socket.emit("bid-error", `Minimum bid should be ₹${minAllowedBid}`);
        return;
      }

      // UPDATE PRODUCT
      product.currentBid = amount;
      product.totalBids += 1;

      await product.save();

      // BROADCAST TO ALL USERS IN ROOM
      io.to(productId).emit("bid-updated", {
        currentBid: product.currentBid,
        totalBids: product.totalBids,
        lastBidBy: userId,
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
  console.log("🚀 Server running on port 3000");
});
