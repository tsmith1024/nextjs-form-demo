"use client"

import { FormEvent, FormEventHandler, useState } from "react"

const BASE_URL = "http://localhost:3000" // or your favorite localhost port

export default function Home() {
  const [inputs, setInputs] = useState({})
  // inputs => { email: "test@example.com", password: "#ABC123!" }

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    // spread inputs
    // set value for input name
    // if value was previously set, it will be replaced with new value
    const updatedInputs = { ...inputs, [name]: value }
    setInputs(updatedInputs)
    console.log(inputs)
  }

  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault()
    console.log("inputs", inputs)
    // submit to backend
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      body: JSON.stringify(inputs),
    })
    const data = await response.json()
    // if successful, user has been authenticated!
    // store token in cookie or local storage
    // something like -- localStorage.setItem("token", data.token)
    // ...
    // redirect to dashboard
    // ...
    // profit!
  }

  return (
    <main className="">
      <h1 className="text-5xl font-bold">My Awesome Form</h1>
      <div className="mx-4">
        <form onSubmit={onSubmit}>
          <AwesomeInput
            name="email"
            onChange={handleChange}
            placeholder="email"
            type="email"
            className="my-2"
          />
          <br />
          <AwesomeInput
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <br />
          <button
            className="bg-emerald-500 text-black px-4 py-2 mt-2 rounded-lg"
            type="submit">
            Sign In!
          </button>
        </form>
      </div>
    </main>
  )
}

interface AwesomeInputProps {
  name: string
  onChange: FormEventHandler<HTMLInputElement>
  placeholder?: string
  type?: string
  className?: string
}

export const AwesomeInput = (props: AwesomeInputProps) => {
  const baseClassNames = "text-black px-2 py-1 rounded-lg bg-slate-100"
  const mergedClassNames = `${baseClassNames} ${props.className}`
  const inputType = props.type || "text"
  const placeholder = props.placeholder || ""

  return (
    <input
      className={mergedClassNames}
      placeholder={placeholder}
      type={inputType}
      name={props.name}
      onChange={props.onChange}
    />
  )
}
