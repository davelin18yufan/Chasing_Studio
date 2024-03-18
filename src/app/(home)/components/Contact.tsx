"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { contactSchema } from "@/lib/validation"
import { genders } from "@/constants"
import { FaLine } from "react-icons/fa"

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
import { motion } from "framer-motion"

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
    <>
      <section className="py-10 lg:py-12 px-3 lg:px-4 bg-footer bg-blend-multiply bg-no-repeat bg-cover dark:bg-gray-800/50 relative">
        <div className="container max-w-3xl lg:max-w-5xl ">
          <div className="space-y-4">
            <motion.h2
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              className="title absolute -top-3 "
              style={{ originY: 1 }}
              transition={{ duration: 0.8, ease: "linear" }}
            >
              Contact Us
            </motion.h2>
            <p className="subTitle">
              Ready to get started? Send us a message and we will be in touch.
            </p>
          </div>
          <div className="flex flex-wrap-reverse justify-center items-center gap-8 mt-4">
            <div className="space-y-4 flex-1 min-w-96">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4 bg-transparent">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-icon">
                              First Name
                            </FormLabel>
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
                            <FormLabel className="text-icon">
                              Last Name
                            </FormLabel>
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
                            <FormLabel className="text-icon">Gender</FormLabel>
                            <FormControl>
                              <select className="w-full" {...field}>
                                {genders.map((gender) => (
                                  <option
                                    key={gender}
                                    value={gender === "Select" ? "" : gender}
                                    disabled={gender === "Select"}
                                    defaultChecked={gender === "Select"}
                                  >
                                    {gender === "Select" ? "" : gender}
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
                          <FormLabel className="text-icon">Email</FormLabel>
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
                          <FormLabel className="text-icon">Message</FormLabel>
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
            <div className="flex flex-col items-center justify-center gap-4 relative aspect-square max-w-[300px]">
              <img
                src="https://qr-official.line.me/gs/M_157lrzya_GW.png?oat_content=qr"
                alt="qrcode"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>
      <motion.a
        whileHover={{
          scale: [1, 1.5, 1.5, 1, 1.2],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["50%", "0%", "50%", "50%", "100%"],
        }}
        transition={{
          duration: 2,
          ease: "backIn",
          times: [0, 0.2, 0.5, 0.8, 1],
        }}
        href="https://lin.ee/UcCpVtZ"
        className="fixed right-8 bottom-6 rounded-full w-10 h-10 z-20"
      >
        <FaLine className="size-full bg-transparent" />
      </motion.a>
    </>
  )
}
