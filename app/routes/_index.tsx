import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Button } from '~/components/ui/button'

export default function Index() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-5">
      <h1 className="font-serif text-3xl font-bold">Welcome to Remix</h1>
      <div className="flex gap-3">
        <Button asChild>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Get Started
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a target="_blank" href="https://github.com/front-loop/remix-netlify-tmpl" rel="noreferrer">
            <GitHubLogoIcon className="mr-2 size-4" />
            GitHub
          </a>
        </Button>
      </div>
    </div>
  )
}
