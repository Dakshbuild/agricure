export default function Login() {
  return (
    <div className="container mx-auto px-6 py-24 flex items-center justify-center min-h-[80vh]">
      <div className="glass p-10 rounded-3xl w-full max-w-md">
        <h1 className="text-3xl font-heading font-bold text-center mb-2 text-foreground">Welcome Back</h1>
        <p className="text-center text-foreground/60 mb-8">Sign in to your CROPLY dashboard</p>
        <div className="flex flex-col gap-4">
          <button className="w-full py-3 rounded-xl bg-background border border-glass-border font-medium text-foreground hover:bg-black/5 transition-colors">
            Continue with Google
          </button>
          <div className="text-center text-sm text-foreground/50 my-2">OR</div>
          <input type="email" placeholder="Email Address" className="w-full py-3 px-4 rounded-xl bg-background/50 border border-glass-border outline-none focus:border-primary" />
          <button className="w-full py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
