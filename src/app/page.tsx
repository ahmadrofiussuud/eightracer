import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect default landing to the flagship Scholarship Analytics Dashboard
  redirect("/dashboard/alumni");
}
