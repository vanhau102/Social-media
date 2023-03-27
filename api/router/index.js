import userRoutes from "./users.js";
import authRoutes from "./auth.js";
import postRoutes from "./posts.js";
import storyRoutes from "./stories.js";
import likeRoutes from "./likes.js";
import commentRoutes from "./comments.js";


function router(app) {
    app.use("/api/auth/", authRoutes);
    app.use("/api/users/", userRoutes);
    app.use("/api/posts/", postRoutes);
    app.use("/api/stories/", storyRoutes);
    app.use("/api/likes/", likeRoutes);
    app.use("/api/comments/", commentRoutes);
}

export default router;