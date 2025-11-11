import { redirect } from "next/navigation";
import type { UserType } from "../types/userType";
import { getUserAction } from "./action";

export default async function Dashboard() {
  const result = await getUserAction();

  if ("error" in result || !result.user) {
    redirect("/login");
  }

  const user = (result.user ?? result.data) as UserType;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-2">
          Selamat datang, {user.name} 👋
        </h1>
        <p className="text-sm text-gray-600">Email: {user.email}</p>
      </div>
    </div>
  );
}
