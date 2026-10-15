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
    <form onSubmit={onSubmit} className="!px-4 !py-2 bg-surface-light border-t border-base-300">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Type a message..."
          className=" !p-2 flex-1  border-b border-base-300 text-gray-800 focus:outline-none focus:ring-0 "
        />
        <button
          type="submit"
          disabled={disabled}
          className="text-surface-light rounded-full bg-linear-to-r from-primary to-primary !p-2 border-none disabled:btn-disabled"
        >
          <SendIcon className="size-5" />
        </button>
      </div>
    </form>
  )
}
