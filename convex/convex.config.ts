import { defineApp } from "convex/server";
import steel from "steel-convex-component/convex.config";

const app = defineApp();
app.use(steel);

export default app;
