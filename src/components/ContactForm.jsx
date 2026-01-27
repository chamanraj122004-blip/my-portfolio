import React from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
  // Your real Formspree ID
  const [state, handleSubmit] = useForm("xpqqkojb");

  if (state.succeeded) {
    return (
      <div className="bg-slate-800 p-8 rounded-xl border border-emerald-500/50 text-center">
        <p className="text-emerald-400 font-bold text-xl">
          🎉 Message sent successfully!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl w-full"
    >
      <h2 className="text-3xl font-bold mb-2 text-white">
        Get In Touch
      </h2>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="text-sm font-medium text-slate-300"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-red-400 text-xs"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="message"
          className="text-sm font-medium text-slate-300"
        >
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          required
          className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="text-red-400 text-xs"
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-all disabled:opacity-50"
      >
        {state.submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
