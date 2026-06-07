import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  registerSchema,
  type RegisterFormData,
} from "@/features/auth/schemas/register.schema";

import { useRegisterMutation } from "@/features/auth/hooks/useRegisterMutation";

export default function RegisterForm() {
  const registerMutation =
    useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<RegisterFormData>({
    resolver:
      zodResolver(registerSchema),

    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (
    values: RegisterFormData
  ) => {
    registerMutation.mutate(values);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          Get Started with DocuMind
        </CardTitle>

        <CardDescription>
          Upload documents, analyze content,
          and chat with your knowledge base.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name
            </Label>

            <Input
              id="fullName"
              autoComplete="name"
              {...register(
                "fullName"
              )}
            />

            {errors.fullName && (
              <p className="text-sm text-destructive">
                {
                  errors.fullName
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">
              Username
            </Label>

            <Input
              id="username"
              autoComplete="username"
              {...register(
                "username"
              )}
            />

            {errors.username && (
              <p className="text-sm text-destructive">
                {
                  errors.username
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register(
                "email"
              )}
            />

            {errors.email && (
              <p className="text-sm text-destructive">
                {
                  errors.email
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register(
                "password"
              )}
            />

            {errors.password && (
              <p className="text-sm text-destructive">
                {
                  errors.password
                    .message
                }
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              registerMutation.isPending
            }
          >
            {registerMutation.isPending
              ? "Creating Account..."
              : "Create Account"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}