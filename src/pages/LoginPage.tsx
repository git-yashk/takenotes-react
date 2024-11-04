import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import useTokenStore from "@/zustand_store";

const formSchema = z.object({
  email: z.string().min(8, { message: "Please enter a valid email address." }).max(50).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }).max(50).trim(),
})

export default function LoginPage() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log("Login successful");
      setToken((response.data as { accessToken: string }).accessToken);
      navigate("/");
    },
    onError: () => {
      console.log("Login failed");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          autoFocus
                          type="email"
                          spellCheck="false"
                          placeholder="jhondoe123@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Link to="/forgot-password" className="text-sm underline hover:text-red-600">Forgot password?</Link>
                  </div>
                </div>

                <Button className="w-full" type="submit">Sign in</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm">
              <span>Don't have an account?{" "}</span>
              <Link to="/auth/register" className="underline hover:text-red-600">Sign up</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}