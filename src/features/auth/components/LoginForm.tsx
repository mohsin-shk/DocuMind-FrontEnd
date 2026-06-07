import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  loginSchema,
  type LoginFormData,
} from "@/features/auth/schemas/login.schema";

import { useLoginMutation } from "@/features/auth/hooks/useLoginMutation";

export default function LoginForm() {
  const loginMutation =
    useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(loginSchema),

    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = (
    values: LoginFormData
  ) => {
    loginMutation.mutate(values);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          Welcome Back
        </CardTitle>

        <CardDescription>
          Continue your AI-powered document conversations.
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
            <Label htmlFor="identifier">
              Email or Username
            </Label>

            <Input
              id="identifier"
              placeholder="john@example.com"
              {...register(
                "identifier"
              )}
            />

            {errors.identifier && (
              <p className="text-sm text-destructive">
                {
                  errors.identifier
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
              loginMutation.isPending
            }
          >
            {loginMutation.isPending
              ? "Signing In..."
              : "Sign In"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Create one
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}