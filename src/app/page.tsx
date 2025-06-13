import { Suspense } from "react"

import Component from "./diary-home"
import BackgroundVideo from './components/BackgroundVideo';

export default function Page() {
  return (
    <>
      <BackgroundVideo />
      <Suspense>
        <Component />
      </Suspense>
    </>
  )
}
