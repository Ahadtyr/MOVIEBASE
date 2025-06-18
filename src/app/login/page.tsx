import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  return (
    <PageContainer className="flex items-center justify-center min-h-[calc(100vh-12rem)] py-12">
      <Card className="w-full max-w-md shadow-2xl shadow-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline flex items-center justify-center">
            <LogIn className="w-8 h-8 mr-2 text-primary neon-glow-primary" />
            Login to MOVIEBASE
          </CardTitle>
          <CardDescription>Access your watchlist, ratings, and personalized recommendations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="focus:ring-accent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" className="focus:ring-accent" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Checkbox component can be added here if available or a simple input type checkbox */}
              {/* <Checkbox id="remember-me" /> */}
              {/* <Label htmlFor="remember-me" className="text-sm">Remember me</Label> */}
            </div>
            <Link href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
            Login
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </PageContainer>
  );
}
