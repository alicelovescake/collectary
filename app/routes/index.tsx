import { useEffect } from "react";
import { BookmarkIcon, ScissorsIcon } from "@heroicons/react/solid";

// @TODO sort out gsap type/import issues
//@ts-ignore
import { gsap } from "gsap/dist/gsap";
//@ts-ignore
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useOptionalUser } from "~/utils";
import { MockBrowser } from "~/components/MockBrowser";

export default function Index() {
  const user = useOptionalUser();
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.querySelector("body"),
        pin: document.querySelector(".content-container"),
        scrub: true,
        start: "top top",
        end: "+=500%",
      },
    });

    timeline
      .fromTo(".content-header-1", { opacity: 1 }, { opacity: 0.5 })
      .fromTo(".content-header-2", { opacity: 0.5 }, { opacity: 1 })
      .to(".content-header-2", { opacity: 0.5 })
      .fromTo(".content-header-3", { opacity: 0.5 }, { opacity: 1 });

    const timeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: document.querySelector("body"),
        pin: document.querySelector(".content-container"),
        scrub: true,
        start: "top top",
        end: "+=500%",
      },
    });

    timeline2
      .fromTo(
        ".content-body-1",
        { top: 0 },
        { top: "-300px", opacity: 0, display: "none" }
      )
      .fromTo(
        ".content-body-2",
        { top: "150px" },
        { top: 0, display: "block", opacity: 1 }
      )
      .to(".content-body-2", { top: "-300px", opacity: 0, display: "none" })
      .fromTo(
        ".content-body-3",
        { top: "150px" },
        { top: "-24px", display: "block", opacity: 1 }
      );
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <main>
        <div className="content-container">
          <section className="mb-20 flex flex-col items-center pt-20">
            <h1 className="w-fit bg-gradient-to-br from-green-500 to-green-700 bg-clip-text text-4xl font-bold text-transparent">
              collectary
            </h1>
            <p className="text-center text-6xl font-bold">
              Collaborative reading lists for modern times.
            </p>
          </section>

          <section className="flex justify-between rounded-lg bg-brand-white bg-opacity-60 p-12">
            <div className="space-y-4">
              <div className="content-header-1 text-4xl font-bold">
                collect.
              </div>
              <div className="content-header-2 text-4xl font-bold opacity-50">
                share.
              </div>
              <div className="content-header-3 text-4xl font-bold opacity-50">
                clip.
              </div>
            </div>

            <div className="relative w-2/3">
              <div className="content-body-1 absolute w-full">
                <div className="mb-6 text-center text-xl font-bold">
                  Easily save articles from around the web.
                </div>

                <MockBrowser>
                  <div className="group relative h-full p-8">
                    <BookmarkIcon className="absolute right-4 -mt-4 w-12 text-green-500 transition-all duration-300 ease-in-out group-hover:right-6 group-hover:text-green-600" />

                    <div className="opacity-40 transition-opacity duration-300 ease-in-out group-hover:opacity-20">
                      <div className="text-lg font-bold">
                        10 tips that'll improve your podracing
                      </div>
                      <div className="text-xs">Anakin Skywalker</div>

                      <div className="mt-4 text-xs">
                        When podracing, you can't afford to let up even for a
                        moment. An instant of distraction is enough to put you
                        at the back of the pack. If you want to win, these 10
                        tips will help you leave the other racers in the dust.
                      </div>

                      <div className="mt-4 font-bold">
                        1. Learn to maintain your repulsorcraft
                      </div>
                      <div className="mt-4 text-xs">
                        Understanding your craft will pay dividens when you're
                        on the track. Racers are ruthless. You're unlikely to
                        finish a race without something going wrong. Knowing how
                        to handle potential failures will help you keep focused
                        on what matters: the race. And if something does go
                        wrong, you might have a chance of fixing it.
                      </div>
                    </div>
                  </div>
                </MockBrowser>
              </div>

              <div className="content-body-2 absolute hidden w-full opacity-0">
                <div className="mb-6 text-center text-xl font-bold">
                  Share or collaborate on your reading lists.
                </div>

                <MockBrowser>
                  <div className="group relative h-full p-8">
                    <div className="flex justify-between">
                      <div className="opacity-40 transition-opacity duration-300 ease-in-out group-hover:opacity-20">
                        <div className="text-lg font-bold">
                          Great Podracing Articles
                        </div>
                        <div className="text-xs">Collected by Sebulba</div>
                      </div>

                      <div className="flex space-x-4">
                        <div className="h-fit rounded bg-green-500 px-2 py-1 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:-mt-1 hover:shadow-lg">
                          Share
                        </div>
                        <div className="h-fit rounded border border-stone-200 px-2 py-1 text-sm font-bold text-stone-400  transition-all duration-300 ease-in-out hover:-mt-1 hover:shadow-lg">
                          Invite
                        </div>
                      </div>
                    </div>

                    <div className="opacity-40 transition-opacity duration-300 ease-in-out group-hover:opacity-20">
                      <div className="mt-4 font-bold">
                        10 tips that'll improve your podracing
                      </div>

                      <div className="mt-4 font-bold">
                        The history of Tatooine podracing
                      </div>

                      <div className="mt-4 font-bold">DIY Repulsorcraft</div>
                    </div>
                  </div>
                </MockBrowser>
              </div>

              <div className="content-body-3 absolute hidden w-full opacity-0">
                <div className="mb-6 text-center text-xl font-bold">
                  Save notes and clip quotes directly from the article.
                </div>

                <MockBrowser>
                  <div className="group relative h-full p-8">
                    <ScissorsIcon className="absolute right-4 -mt-4 w-12 text-green-500 transition-all duration-300 ease-in-out group-hover:right-6 group-hover:text-green-600" />

                    <div className="opacity-40 transition-opacity duration-300 ease-in-out group-hover:opacity-20">
                      <div className="text-lg font-bold">
                        10 tips that'll improve your podracing
                      </div>
                      <div className="text-xs">Anakin Skywalker</div>
                    </div>

                    <div className="mt-4 text-xs">
                      <span className="opacity-40 transition-opacity duration-300 ease-in-out group-hover:opacity-20">
                        When podracing, you can't afford to let up even for a
                        moment.
                      </span>{" "}
                      <span className="bg-green-200 font-bold">
                        An instant of distraction is enough to put you at the
                        back of the pack.
                      </span>{" "}
                      <span className="opacity-40 transition-opacity duration-300 ease-in-out group-hover:opacity-20">
                        If you want to win, these 10 tips will help you leave
                        the other racers in the dust.
                      </span>
                    </div>

                    <div className="opacity-40 transition-opacity duration-300 ease-in-out group-hover:opacity-20">
                      <div className="mt-4 font-bold">
                        1. Learn to maintain your repulsorcraft
                      </div>
                      <div className="mt-4 text-xs">
                        Understanding your craft will pay dividens when you're
                        on the track. Racers are ruthless. You're unlikely to
                        finish a race without something going wrong. Knowing how
                        to handle potential failures will help you keep focused
                        on what matters: the race. And if something does go
                        wrong, you might have a chance of fixing it.
                      </div>
                    </div>
                  </div>
                </MockBrowser>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
