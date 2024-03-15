"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { contactSchema } from "@/lib/validation"
import { genders } from "@/constants"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { QRCodeSVG } from "qrcode.react"
import Link from "next/link"

export default function Contact() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "male",
      email: "",
      message: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof contactSchema>) {
    // TODO: directly passing messages to line -> webhook
    console.log(values)
  }
  return (
    <section className="py-12 lg:py-24">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <div className="space-y-4">
          <h2 className="title">Contact Us</h2>
          <p className="subTitle">
            Ready to get started? Send us a message and we will be in touch.
          </p>
        </div>
        <div className="grid md:grid-cols-2 items-start gap-8 mt-4">
          <div className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your first name.."
                              {...field}
                              type="text"
                            />
                          </FormControl>
                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your last name.."
                              {...field}
                              type="text"
                            />
                          </FormControl>
                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <select className="w-full" {...field}>
                              {genders.map((gender) => (
                                <option key={gender} value={gender}>
                                  {gender}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your email address.."
                            {...field}
                            type="email"
                          />
                        </FormControl>
                        <FormMessage className="text-error" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <textarea
                            placeholder="Your want to.."
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage className="text-error" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="primary">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
          {/* QR Code */}
          <div className="flex flex-col items-center justify-center gap-4">
            <a href="https://lin.ee/UcCpVtZ" className="hover:opacity-70">
              <img
                src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"
                alt="加入好友"
                height="20"
              />
            </a>
            <img src="https://qr-official.line.me/gs/M_157lrzya_GW.png?oat_content=qr" className=""/>
          </div>
        </div>
      </div>
    </section>
  )
}
