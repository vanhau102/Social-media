import userRoutes from "./users.js";
import authRoutes from "./auth.js";
import postRoutes from "./posts.js";
import storyRoutes from "./stories.js";
import likeRoutes from "./likes.js";
import commentRoutes from "./comments.js";
import relationshipsRoutes from "./relationships.js";

function router(app) {
    app.use("/api/auth/", authRoutes);
    app.use("/api/users/", userRoutes);
    app.use("/api/posts/", postRoutes);
    app.use("/api/stories/", storyRoutes);
    app.use("/api/likes/", likeRoutes);
    app.use("/api/comments/", commentRoutes);
    app.use("/api/relationships/", relationshipsRoutes);
}

export default router;