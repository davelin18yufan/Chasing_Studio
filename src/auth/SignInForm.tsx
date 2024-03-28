"use client"

import FieldSetWithStatus from "@/components/FieldSetWithStatus"
import InfoBlock from "@/components/InfoBlock"
import SubmitButtonWithStatus from "@/components/SubmitButtonWithStatus"
import { useLayoutEffect, useRef, useState } from "react"
import { signInAction } from "./actions"
import { useFormState } from "react-dom"
import ErrorNote from "@/components/ErrorNote"
import { KEY_CALLBACK_URL, KEY_CREDENTIALS_SIGN_IN_ERROR } from "."
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

export default function SignInForm() {
  const params = useSearchParams()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [response, action] = useFormState(signInAction, undefined)
  const t = useTranslations("Admin.actions.loginForm")

  const emailRef = useRef<HTMLInputElement>(null)
  useLayoutEffect(() => {
    emailRef.current?.focus()
  }, [])

  const isFormValid = email.length > 0 && password.length > 0

  return (
    <InfoBlock>
      <form action={action}>
        <div className="space-y-8">
          {response === KEY_CREDENTIALS_SIGN_IN_ERROR && (
            <ErrorNote>{t("error")}</ErrorNote>
          )}
          <div className="space-y-4">
            <FieldSetWithStatus
              id="email"
              inputRef={emailRef}
              label={t("email")}
              type="email"
              value={email}
              onChange={setEmail}
            />
            <FieldSetWithStatus
              id="password"
              label={t("password")}
              type="password"
              value={password}
              onChange={setPassword}
            />
            <input
              type="hidden"
              name={KEY_CALLBACK_URL}
              value={params.get(KEY_CALLBACK_URL) ?? ""}
            />
          </div>
          <SubmitButtonWithStatus disabled={!isFormValid}>
            {t("signIn")}
          </SubmitButtonWithStatus>
        </div>
      </form>
    </InfoBlock>
  )
}
