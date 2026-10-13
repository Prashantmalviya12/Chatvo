import { SignInButton, SignUpButton } from "@clerk/react";
import { ArrowRightIcon } from "lucide-react";
import React from "react";

export default function AuthPage() {
  return (
    <div>
      <nav className="flex items-center justify-between relative z-10 !py-2 !pl-4 !pr-8  ">
        <div className="flex items-center gap-2.5">
          <img
            src="../../public/images/logo.png"
            className="w-50 h-15   object-cover"
          />
        </div>

        <div className="flex items-center gap-2">
          <SignInButton mode="modal">
            <button className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-base-content transition">
              Sign in
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="btn gap-2 !px-2 !py-1 bg-linear-to-r flex items-center from-primary to-surface text-foreground text-sm font-semibold rounded-full hover:opacity-90 shadow-lg shadow-surface-light/25 border-none">
              Get Started
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </SignUpButton>
        </div>
      </nav>
      <div className=" bg-base-100 text-base  flex ">
        {/* LEFT SIDE */}
        <div className="flex flex-1 flex-col !p-8 lg:!p-9 relative overflow-hidden ">
          {/* NAVBAR */}
          {/* <nav className="flex items-center justify-between relative z-10  ">
          <div className="flex items-center gap-2.5">
            <img
              src="../../public/images/logo.png"
              className="w-40 h-15  object-cover"
            />
          </div>

          <div className="flex items-center gap-2">
            <SignInButton mode="modal">
              <button className="!px-5 !py-2.5 text-sm font-medium text-muted-foreground hover:text-base-content transition">
                Sign in
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="btn gap-2 bg-linear-to-r flex items-center from-primary to-surface text-foreground text-sm font-semibold rounded-full hover:opacity-90 shadow-lg shadow-surface-light/25 border-none">
                Get Started
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </SignUpButton>
          </div>
        </nav> */}

          {/* MAIN CONTENT */}
          <div className="flex-1 flex flex-col justify-center max-w-xl   relative z-10">
            {/* Tag */}
            <div className="">
              <span className="inline-flex items-center gap-2 !px-4 !py-2 rounded-full   border-surface-light text-green-400 text-xs font-mono uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Now Available
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight font-mono">
              Messaging for
              <br />
              <span className="bg-linear-to-r from-surface via-surface to-surface-light bg-clip-text text-transparent">
                everyone
              </span>
            </h1>

            {/* Description */}
            <p className="!mt-6 text-lg text-base-content/70 leading-relaxed max-w-md">
              Secure, blazing-fast conversations with real-time presence and
              instant delivery. Connect with anyone, anywhere.
            </p>

            {/* CTA BTNS */}
            <div className="!mt-10 flex items-center gap-4">
              <SignUpButton mode="modal">
                <button className="group flex items-center gap-3 !px-8 !py-4 bg-surface-light text-muted-foreground font-semibold rounded-2xl hover:bg-surface hover:text-white transition">
                  Start chatting
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </SignUpButton>

              <SignInButton mode="modal">
                <button className="!px-8 !py-4 text-primary hover:bg-surface hover:text-white font-semibold border rounded-2xl  transition">
                  I have an account
                </button>
              </SignInButton>
            </div>

            {/* Avatars */}
            <div className="!mt-8 flex items-center gap-4">
              <span className="text-sm text-base-content/70">
                Join{" "}
                <span className="font-mono text-base-content/80">10,000+</span>{" "}
                happy users
              </span>
            </div>

            {/* STATS */}
            <div className="!mt-12 flex items-center gap-10">
              <div>
                <div className="text-2xl font-bold font-mono">10K+</div>
                <div className="text-xs text-base-content/60 !mt-1 uppercase tracking-wider">
                  Users
                </div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-2xl font-bold font-mono">99.9%</div>
                <div className="text-xs text-base-content/60 !mt-1 uppercase tracking-wider">
                  Uptime
                </div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-2xl font-bold font-mono">&lt;50ms</div>
                <div className="text-xs text-base-content/60 !mt-1 uppercase tracking-wider">
                  Latency
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="hidden lg:flex flex-1 relative bg-base-200 items-center justify-center overflow-hidden">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Radial Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]
           bg-linear-to-r from-surface-light to-surface-light rounded-full blur-[100px]"
          />

          {/* Image Container */}
          <div className="relative z-10">
            {/* Decorative border */}
            <div className="absolute -inset-px rounded-3xl bg-linear-to-b from-white/20 to-white/5 p-px">
              <div className="w-full h-full rounded-3xl bg-base-200" />
            </div>

            {/* Card */}
            <div className="relative !p-6 rounded-3xl border border-base-300 bg-base-200/80 backdrop-blur-xl shadow-2xl">
              <img
                src="../../public/images/logo.png"
                alt="Chat illustration"
                className="w-80 xl:w-96 rounded-2xl"
              />

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 !px-4 !py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium backdrop-blur-sm">
                ● 3 online
              </div>

              <div className="absolute -bottom-4 -left-4 !px-4 !py-2.5 bg-base-300/40 border border-base-300 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-amber-400 to-orange-500" />
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-rose-400 to-pink-500" />
                  </div>
                  <span className="text-sm text-base-content/80">
                    typing...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
