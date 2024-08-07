import { useState, useContext } from "react";
import { Link } from "react-router-dom";
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

/**
 * SignUpForm Component
 *
 * This component renders a sign-up form that allows users to create a new account.
 * It utilizes various UI components such as Card, Input, Button, and Alert to create
 * a structured and user-friendly interface.
 *
 * The component uses the AuthContext to handle user registration and displays appropriate
 * error messages based on the sign-up attempt.
 */
const SignUpForm = () => {
  // State variables to store the input values for the sign-up form
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  // Destructure signUpUser and signUpErrors from AuthContext
  let { signUpUser, signUpErrors } = useContext(AuthContext);

  return (
    <Card className="max-w-sm mx-auto w-96">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>Create a new ish account</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Display an error alert if signUpErrors is true */}
        {signUpErrors && (
          <Alert variant="destructive" className="mb-6">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <AlertTitle>Error while signing up</AlertTitle>
            <AlertDescription>
              {signUpErrors &&
                Object.values(signUpErrors).map((errorCategory) =>
                  errorCategory.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))
                )}
            </AlertDescription>
          </Alert>
        )}
        {/* Form to handle user sign-up */}
        <form onSubmit={signUpUser}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Terry"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Davis"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="terryadavis"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="terrydavis@temple.os"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Sign Up
            </Button>
          </div>
        </form>
        <CardFooter className="flex justify-center pt-4 pb-0 text-sm font-light text-gray-700">
          <Link to="/login">Log into your account</Link>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
