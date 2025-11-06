"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Spline from "@splinetool/react-spline";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 ">
      {/* Left Side - Transparent Form */}
      <div className="flex items-center justify-center p-8 backdrop-blur-sm">
        <div className="w-full max-w-md bg-white/10 rounded-2xl p-8 backdrop-blur-lg border border-white/20">
          <div className="flex flex-row gap-2 justify-center mb-8">
            {/* <Image
              src="/logo.svg"
              alt="logo"
              height={32}
              width={38}
              className="invert"
            /> */}
            <h2 className="text-2xl font-bold text-white">Hirely</h2>
          </div>

          <h3 className="text-xl font-semibold text-center mb-8 text-white">
            Practice job interviews with AI
          </h3>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              {!isSignIn && (
                <FormField
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Your Name"
                  type="text"
                  // transparent
                />
              )}

              <FormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="Your email address"
                type="email"
                transparent
              />

              <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
                transparent
              />

              <Button
                className="w-full bg-white text-[#1a2980] hover:bg-white/90 py-6 rounded-xl font-bold"
                type="submit"
              >
                {isSignIn ? "Sign In" : "Create an Account"}
              </Button>
            </form>
          </Form>

          <p className="text-center mt-6 text-white">
            {isSignIn ? "No account yet?" : "Have an account already?"}
            <Link
              href={!isSignIn ? "/sign-in" : "/sign-up"}
              className="font-bold text-white ml-1 underline"
            >
              {!isSignIn ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Spline Design */}
      <div className="hidden lg:flex items-center justify-center p-8">
        <div className="w-full h-full max-w-2xl">
          {/* <Spline
            scene="https://prod.spline.design/yE7LITKgx7EuMFCe/scene.splinecode"
            className="w-full h-full"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
