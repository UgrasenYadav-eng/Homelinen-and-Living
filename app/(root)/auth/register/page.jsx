'use client'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import Logo from '@/public/assets/images/logo-black.png'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { zSchema } from '@/lib/zodSchema'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { z } from 'zod'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from 'next/link'
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'
import axios from 'axios'
import { showToast } from '@/lib/showToast'
const RegisterPage = () => {
    const [loading, setLoading] = useState(false)
    const [isTypePassword, setIsTypePassword] = useState(true)
    const formSchema = zSchema.pick({
        name: true, email: true, password: true
    }).extend({
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Password and confirm password must be same.',
        path: ['confirmPassword']
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            mobile: "",       // 👈 correct
            },
})


    const handleRegisterSubmit = async (values) => {
        try {
            setLoading(true)
            const { data: registerResponse } = await axios.post('/api/auth/register', values)
            if (!registerResponse.success) {
                throw new Error(registerResponse.message)
            }

            form.reset()
            showToast('success', registerResponse.message)

        } catch (error) {
            showToast('error', error.message)
        } finally {
            setLoading(false)
        }
    }
return (
  <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-[#faf8f5]">

    <Card className="w-full max-w-[420px] sm:max-w-[520px] shadow-xl">
      <CardContent className="p-6 sm:p-10">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <Image
            src={Logo.src}
            width={Logo.width}
            height={Logo.height}
            alt="logo"
            className="max-w-[120px] sm:max-w-[150px]"
            priority
          />
        </div>

        {/* TITLE */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Create Account
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Create a new account by filling out the form below.
          </p>
        </div>

        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegisterSubmit)}
            className="space-y-4"
          >

            {/* NAME */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* MOBILE */}
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="9912345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* EMAIL */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PASSWORD */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={isTypePassword ? "password" : "text"}
                      placeholder="***********"
                      {...field}
                    />
                  </FormControl>

                  <button
                    type="button"
                    onClick={() => setIsTypePassword(!isTypePassword)}
                    className="absolute right-3 top-[38px] text-muted-foreground"
                  >
                    {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CONFIRM */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type={isTypePassword ? "password" : "text"}
                      placeholder="***********"
                      {...field}
                    />
                  </FormControl>

                  <button
                    type="button"
                    onClick={() => setIsTypePassword(!isTypePassword)}
                    className="absolute right-3 top-[38px] text-muted-foreground"
                  >
                    {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SUBMIT */}
            <ButtonLoading
              loading={loading}
              type="submit"
              text="Create Account"
              className="w-full"
            />

            {/* LOGIN */}
            <div className="text-center pt-3 text-sm">
              <span>Already have account? </span>
              <Link
                href={WEBSITE_LOGIN}
                className="text-primary underline font-medium"
              >
                Login
              </Link>
            </div>

          </form>
        </Form>

      </CardContent>
    </Card>

  </div>
)


}

export default RegisterPage