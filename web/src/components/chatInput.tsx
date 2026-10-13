import { SendIcon } from 'lucide-react'
import React, { type ChangeEvent, type FormEvent } from 'react'

type chatInputType = {
     value:string 
      onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    disabled:boolean
 }

export default function ChatInput({value,onChange,onSubmit,disabled}:chatInputType) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-base-300">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Type a message..."
          className="input input-bordered !p-4 flex-1 rounded-xl bg-base-300/40 border-base-300 placeholder:text-base-content/60 focus:outline-none focus:ring-0 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={disabled}
          className="btn rounded-full bg-linear-to-r from-surface-light to-surface-light !p-2 border-none disabled:btn-disabled"
        >
          <SendIcon className="size-5" />
        </button>
      </div>
    </form>
  )
}
