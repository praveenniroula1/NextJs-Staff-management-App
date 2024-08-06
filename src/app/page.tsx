import { Toaster } from "react-hot-toast";
import UserForm from "./Components/UserForm";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center bg-green-500 p-4 m-4">
        Lets do some crud operation with the staff management app
      </h1>
      <UserForm />
     
    </main>
  );
}
