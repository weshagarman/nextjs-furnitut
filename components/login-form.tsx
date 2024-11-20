import { login } from "@/core/auth.server";

export default function LoginForm({ error }: { error?: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Login to View Orders</h1>
      
      {error && (
        <div className="text-red-500 mb-4">
          {error && "Something went wrong. Please try again."}
        </div>
      )}

      <form
        action={async (formData) => {
          "use server";
          await login(formData);
        }}
      >
        <input 
          type="email" 
          placeholder="Email" 
          name="email" 
          required 
          className="px-4 py-2 border rounded mb-4"
        />
        <br />
        <button type="submit" className="px-4 py-2 rounded bg-dark text-light">
          Send Magic Link
        </button>
      </form>
    </div>
  );
}