import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let { loginUser, loginError, loginMessage } = useContext(AuthContext);

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your username and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loginError && (
          <Alert variant="destructive" className="mb-6">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Incorrect login credentials</AlertDescription>
          </Alert>
        )}
        {loginMessage && (
          <Alert>
            <RocketIcon className="w-4 h-4" />
            <AlertTitle>{loginMessage && loginMessage.title}</AlertTitle>
            <AlertDescription>
              {loginMessage && loginMessage.message}
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={loginUser}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
