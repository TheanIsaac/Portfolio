import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, MoveRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Predicting Congestion in Autonomous Vehicle Fleets | Isaac Thean",
  description: "A temporal graph model that predicts lane delays from vehicle routes and recent traffic.",
}

export default function PredictiveDelayEngineArticle() {
  return (
    <main className="min-h-screen bg-[#f7f7f3] pb-24 pt-24 text-[#192621] dark:bg-[#101714] dark:text-[#edf2ed]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link
          href="/#portfolio"
          className="mb-10 inline-flex items-center gap-2 text-sm text-[#52645b] transition-colors hover:text-[#d25c3b] dark:text-[#aebdb4] dark:hover:text-[#f18a68]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>

        <header className="grid items-center gap-12 border-b border-[#d8ded8] pb-14 dark:border-[#35433b] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-20">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#c25435] dark:text-[#f18a68]">
              <span className="h-px w-8 bg-current" /> Engineering journal / Machine learning
            </div>
            <h1 className="text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
              Predicting congestion in autonomous vehicle fleets
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#52645b] dark:text-[#b7c4bc]">
              A temporal graph model that predicts lane delays before queues form.
            </p>
          </div>

          <div
            aria-label="Top-down road map with a line of vehicles following one another toward a blocked pickup point"
            role="img"
            className="relative min-h-[330px] overflow-hidden border border-[#d8ded8] bg-[#e8eee8] dark:border-[#35433b] dark:bg-[#1b2721] sm:min-h-[390px]"
          >
            <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(57,92,72,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(57,92,72,0.12)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="absolute inset-x-0 top-[39%] h-[34%] bg-[#2b3430] shadow-[0_10px_28px_rgba(20,30,24,0.2)]" />
            <div className="absolute inset-y-0 left-[76%] w-[16%] bg-[#2b3430]" />
            <div className="absolute inset-x-0 top-[56%] border-t border-dashed border-white/50" />
            <div className="absolute left-[84%] top-0 h-full border-l border-dashed border-white/40" />
            <div className="absolute left-[8%] top-[10%] text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52645b] dark:text-[#b7c4bc]">
              North yard / lane 04
            </div>
            {[
              { position: "17%", color: "bg-[#1673d1]" },
              { position: "33%", color: "bg-[#1673d1]" },
              { position: "49%", color: "bg-[#1673d1]" },
              { position: "65%", color: "bg-[#1673d1]" },
              { position: "81%", color: "bg-[#d64b3b]" },
            ].map((vehicle, index) => (
              <RoadVehicle key={vehicle.position} position={vehicle.position} color={vehicle.color} index={index} />
            ))}
            <div className="absolute right-[5%] top-[27%] flex items-center gap-2 border border-[#d64b3b]/40 bg-[#f7f7f3] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#a4382d] dark:bg-[#101714] dark:text-[#f18a68]">
              <span className="h-2 w-2 rounded-full bg-[#d64b3b]" /> Pickup / queue
            </div>
            <div className="absolute bottom-[9%] left-[8%] flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#52645b] dark:text-[#b7c4bc]">
              <span className="h-2 w-2 rounded-full bg-[#1673d1]" /> Vehicles follow the same lane
              <MoveRight className="h-3.5 w-3.5" />
              <span className="h-2 w-2 rounded-full bg-[#d64b3b]" /> Blocked pickup
            </div>
          </div>
        </header>

        <article className="mx-auto max-w-3xl pt-12 leading-7 [&_section>p]:mt-4">
            <p className="mb-12 border-l-2 border-[#d25c3b] pl-5 text-xl leading-8 text-[#34483c] dark:text-[#d4dfd6]">
              I built the Predictive Delay Engine, a model that predicts where traffic jams will form in a fleet of
              autonomous (self-driving) vehicles, so that route planners can be warned early enough to act. This post
              follows the idea from the beginning, starting with why congestion matters and what the model predicts,
              and then covering how it learns and what can be built on top of its predictions.
            </p>

            <section id="problem" className="scroll-mt-24">
              <SectionHeading number="01" title="Why congestion slows the whole fleet" />
              <p>
                An autonomous fleet is a group of self-driving vehicles that carry people or goods, such as robots
                moving items across a warehouse or cars answering pickup requests, and because these vehicles share
                the same lanes and often head to the same places, like a pickup point, space is limited and a single
                stopped vehicle forces the vehicles behind it to stop as well.
              </p>
              <p>
                A single stop can grow into a larger problem, because the line of waiting vehicles gets longer until
                it reaches an intersection and blocks the vehicles trying to cross, which leaves vehicles that were
                never headed for the pickup point stuck as well. Waiting vehicles are not doing useful work, so jobs
                finish late and the fleet completes less work overall.
              </p>
              <p>
                Many routing systems send each vehicle along its own shortest path, but if the shortest path for many
                vehicles runs through the same lane, they all arrive together and slow each other down, which means a
                route that is shortest on a map can be slow in practice.
              </p>
              <p>
                To choose better, a planner needs to know how crowded each lane will be when the vehicle gets there
                rather than how crowded it is now, and that is what congestion prediction provides. If the planner is
                warned that a lane will back up, it can send some vehicles another way before the queue forms.
              </p>
            </section>

            <section id="demo" className="mt-14 scroll-mt-24">
              <SectionHeading number="02" title="What a queue looks like" />
              <p>
                Before looking at how the model works, it helps to see the problem it addresses: in the first
                recording, vehicles travel toward pickup points, and in the second, a vehicle stops at a pickup point
                and the vehicles behind it form a queue.
              </p>
              <p>
                The engine marks each lane by how much delay it expects, from green for little delay toward orange and
                red for a lot, and the illustration after the recordings shows the same idea in a simpler form.
              </p>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <DemoFigure
                  number="01"
                  title="Vehicles approach"
                  description="Vehicles travel through shared lanes toward pickup jobs."
                >
                  <Image
                    src="/VehiclesMoving.gif"
                    alt="Fleet vehicles moving along green lanes toward pickup points"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </DemoFigure>
                <DemoFigure
                  number="02"
                  title="A queue forms"
                  description="Vehicles queue behind the blocked pickup point. The Predictive Delay Engine successfully predicts delay forming on the target lane: as more vehicles approach, the lane changes from bright green (low delay) to orange (higher predicted delay)."
                >
                  <Image
                    src="/congestionbuildup.gif"
                    alt="Several fleet vehicles queue on a lane near pickup points"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </DemoFigure>
                <DemoFigure
                  number="03"
                  title="Predicted delay appears"
                  className="md:col-span-2"
                  description="Observe the target lane change from green to yellow. This indicates predicted delay because a vehicle blockage is approaching the lane."
                >
                  <video
                    src="/CongestionVideo1.mp4"
                    aria-label="Traffic simulation showing a lane changing from green to yellow as a vehicle blockage approaches"
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                  />
                </DemoFigure>
              </div>
              <div className="mt-8 border-y border-[#d8ded8] py-6 dark:border-[#35433b]">
                <h3 className="mb-5 text-lg font-semibold">Predicted delay on the target lane</h3>
                <div
                  role="img"
                  aria-label="Illustration of the target lane changing from green for low delay to red for high predicted delay"
                  className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]"
                >
                  <DelayLane label="Now" delay="Low delay" tone="green" vehiclePositions={["20%", "52%", "83%"]} />
                  <MoveRight className="mx-auto h-5 w-5 rotate-90 text-[#8b978f] sm:rotate-0" aria-hidden="true" />
                  <DelayLane label="Predicted" delay="High delay" tone="red" vehiclePositions={["64%", "75%", "84%"]} />
                </div>
                <p className="mt-4 text-sm leading-6 text-[#65756c] dark:text-[#9eadA3]">
                  This simplified example uses red for high predicted delay; the queue GIF shows the lane shifting
                  from green to orange as vehicles approach the blocked pickup point.
                </p>
              </div>
            </section>

            <section id="delay" className="mt-14 scroll-mt-24">
              <SectionHeading number="03" title="Turning congestion into a number" />
              <p>
                Color is easy for a person to read, but a route planner needs something it can compare, so the engine
                predicts one number for each lane, which is its delay.
              </p>
              <h3 className="mt-7 text-xl font-semibold">What delay means</h3>
              <p>
                Delay is the extra time a vehicle spends in a lane compared with a clear lane, where the travel time
                on a clear lane is called its free-flow time. If a lane normally takes 15 seconds to cross and a
                vehicle takes 25, the delay is 10 seconds, and I estimate each lane's free-flow time from the speeds
                vehicles have historically driven there.
              </p>
              <p>
                Measuring extra time instead of total time makes short and long lanes comparable, since both can show
                how much they are slowing vehicles down.
              </p>
              <h3 className="mt-7 text-xl font-semibold">Why predict instead of measure</h3>
              <p>
                Delay that has already happened is not useful for rerouting because the vehicles are already stuck,
                so the model predicts the delay each lane will have during a future 10-second window, which lets it
                warn about a lane that is empty right now when planned routes show several vehicles about to enter it.
              </p>
              <p>
                To make this prediction for every lane at once, the model has to know how lanes are connected,
                because a queue does not stay in one lane and instead spreads backward into the lanes that lead to it.
              </p>
            </section>

            <section id="network" className="mt-14 scroll-mt-24">
              <SectionHeading number="04" title="Giving the model a map of the roads" />
              <p>
                A computer can only reason about connections it is given, so a road network has to be written down as
                data, and the format affects what the model can learn. I started from published research on
                predicting congestion for warehouse robots.
              </p>
              <h3 className="mt-7 text-xl font-semibold">A grid works for a warehouse floor</h3>
              <p>
                <a
                  href="https://www.amazon.science/blog/predicting-congestion-in-fleets-of-robots"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#a9482e] underline decoration-[#d25c3b]/50 underline-offset-4 hover:text-[#d25c3b] dark:text-[#f18a68]"
                >
                  Amazon Science's warehouse-robot congestion research
                </a>{" "}
                is a useful reference. A warehouse floor is a flat area that can be divided into equal square cells,
                forming a grid, and each cell can hold a value such as how many robots are expected to pass through
                it. In the image the values are higher where several robot paths meet, which is where congestion is
                most likely, and a map of predicted delay can be built the same way.
              </p>
              <figure className="my-7 border-y border-[#d8ded8] py-4 dark:border-[#35433b]">
                <Image
                  src="/WarehouseGrid.jpeg"
                  alt="Warehouse floor represented as a 2D grid with projected occupancy and several paths converging near the center"
                  width={1366}
                  height={768}
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="h-auto w-full"
                />
                <figcaption className="mt-3 text-sm leading-6 text-[#65756c] dark:text-[#9eadA3]">
                  The source image shows projected occupancy and path features. It is not an output from my model.
                </figcaption>
              </figure>
              <h3 className="mt-7 text-xl font-semibold">Roads do not fit a grid</h3>
              <p>
                A grid assumes that cells next to each other on the map are connected, but roads break that
                assumption: two lanes can sit side by side and never connect, a vehicle can only move from one lane to
                the next where a turn is allowed, and lanes also differ in length and direction.
              </p>
              <p>
                A better format is a graph, which is a set of items and the connections between them. In my graph,
                each lane is an item (a node) and each legal turn from one lane to another is a connection (an edge),
                so the graph records which lanes can feed traffic into which others.
              </p>
              <h3 className="mt-7 text-xl font-semibold">Reading a graph instead of a grid</h3>
              <p>
                A convolutional neural network (CNN) is a model that works on grids and learns patterns by looking at
                each cell together with the cells next to it, and a graph convolutional network (GCN) applies the
                same idea to a graph by looking at each node together with the nodes it is connected to.
              </p>
              <p>
                For traffic, that means the prediction for one lane takes into account the lanes that lead into it, so
                if a queue is growing on a lane, the model can raise its prediction for the lanes behind it.
              </p>
              <figure className="my-7 border-y border-[#d8ded8] py-4 dark:border-[#35433b]">
                <Image
                  src="/CNN%20to%20GCN.jpeg"
                  alt="Diagram comparing a CNN operating on a regular grid with a GCN operating on connected graph nodes"
                  width={450}
                  height={225}
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="mx-auto h-auto w-full max-w-[450px]"
                />
                <figcaption className="mt-3 text-sm leading-6 text-[#65756c] dark:text-[#9eadA3]">
                  A CNN follows grid positions. A GCN follows graph connections.
                </figcaption>
              </figure>
              <p>
                The graph shows which lanes are connected, but it is a picture of a single moment, and since
                congestion develops over time, the model also needs to see how conditions are changing.
              </p>
            </section>

            <section id="architecture" className="mt-14 scroll-mt-24">
              <SectionHeading number="05" title="Adding time to the prediction" />
              <p>
                Two lanes can have the same speed right now but different futures, since one may be slowing down as a
                queue forms while the other has been slow for a while and is recovering, so to tell them apart the
                model reads the road network at each moment and then looks at how those readings change.
              </p>
              <h3 className="mt-7 text-xl font-semibold">Step 1: read the network at each moment</h3>
              <p>
                At each time step, the GCN combines every lane's current features with those of its connected lanes,
                which produces a snapshot of the network, and a busy road leading into an intersection can show in
                that snapshot that a queue is coming before it reaches the lanes beyond it.
              </p>
              <h3 className="mt-7 text-xl font-semibold">Step 2: read the snapshots in order</h3>
              <p>
                A long short-term memory network (LSTM) is a model designed for sequences, so it takes the snapshots
                one after another and keeps track of what happened earlier, and because it sees the order, it can
                tell a lane that is getting worse from one that is staying the same.
              </p>
              <p>
                Each snapshot is built from these inputs:
              </p>
              <ul className="mt-4 grid gap-x-8 gap-y-2 pl-5 sm:grid-cols-2 [&_li]:list-disc">
                <li>Vehicle positions and recent lane speeds</li>
                <li>Planned routes</li>
                <li>Recent traffic observations</li>
                <li>Upcoming pickup and drop-off jobs</li>
              </ul>
              <p>
                From the sequence of snapshots, the LSTM predicts lane delay at 10, 30, 60, 120, and 240 seconds into
                the future, with each prediction covering a 10-second window, so that short horizons help a vehicle
                that is about to enter a lane and longer ones help plan routes that take a few minutes to drive.
              </p>
              <figure className="my-7 border-y border-[#d8ded8] py-4 dark:border-[#35433b]">
                <Image
                  src="/LSTM.jpeg"
                  alt="Timeline showing a history window, the current time point, and successive future prediction windows built from feature snapshots"
                  width={1694}
                  height={978}
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="h-auto w-full"
                />
                <figcaption className="mt-3 text-sm leading-6 text-[#65756c] dark:text-[#9eadA3]">
                  Recent snapshots form the history window. The model predicts delay in future windows.
                </figcaption>
              </figure>
              <p>
                A model like this learns from examples and so needs to see many queues form and clear, but a real
                fleet does not produce enough of them.
              </p>
            </section>

            <section id="training" className="mt-14 scroll-mt-24">
              <SectionHeading number="06" title="Training in simulation, then adapting to reality" />
              <p>
                Severe congestion is rare in a well-run fleet and waiting for it to happen would take a long time, so
                I modified an autonomous vehicle simulator so that vehicles follow historical lane speeds and slow
                down behind the vehicle ahead, as real vehicles do, which means queues form in simulation and each
                one becomes a training example.
              </p>
              <p>
                The simulator records vehicle movement, lane conditions, and the delay that resulted, and I train the
                model on these records before fine-tuning it with real fleet data so that it adjusts to real vehicles
                and roads, with new records added once their delay outcomes are known.
              </p>
              <h3 className="mt-7 text-xl font-semibold">Choosing what the model should predict</h3>
              <p>
                The first target I considered was a rolling 60-second average of delay, but looking 10 seconds ahead,
                that average still includes 50 seconds of delay that has already happened, so a model could score
                well by repeating recent conditions without predicting anything new.
              </p>
              <p>
                The model now predicts the delay accumulated during a future 10-second interval, which includes time
                spent waiting in a queue even if the vehicle has not left the lane and excludes the time a vehicle
                spends being loaded or unloaded, because that time is part of the job and not traffic.
              </p>
              <p>
                With a model that predicts future delay for every lane, the next question is how to use it.
              </p>
            </section>

            <section id="applications" className="mt-14 scroll-mt-24">
              <SectionHeading number="07" title="What's next: routing with predicted delay" />
              <p>
                The Predictive Delay Engine forecasts delay but does not choose routes, so the next step is to use
                those forecasts to plan routes for the whole fleet at once, aiming for the lowest estimated time of
                arrival (ETA) overall instead of for each vehicle on its own.
              </p>
              <div className="my-8 space-y-0 border-y border-[#d8ded8] dark:border-[#35433b]">
                <ApplicationRow
                  title="1. Estimate each route's ETA"
                  description="For every lane on a route, add the delay predicted for the time the vehicle will reach it to that lane's free-flow time, which gives a more realistic ETA than free-flow time alone."
                />
                <ApplicationRow
                  title="2. Choose routes for the whole fleet"
                  description="Compare combinations of routes and job assignments, and pick the one with the lowest total ETA instead of letting each vehicle take its own shortest path."
                />
                <ApplicationRow
                  title="3. Re-plan as traffic changes"
                  description="Refresh the predictions as vehicles move, so a route can change when a queue starts to form."
                />
              </div>
              <p>
                Planning for the whole fleet matters because one vehicle's choice affects the others, since a route
                that is fastest for one vehicle can add delay for every vehicle that follows it, and because the model
                takes planned routes as an input, a planner can test a candidate plan, see how much delay it would
                create, and change it before any vehicle commits to it.
              </p>
              <p>
                That is the full path, in which the engine predicts where congestion will form and a route planner
                uses those predictions to send vehicles around it, although the result still depends on which routes
                are available, how urgent each job is, and how accurate the forecasts are.
              </p>
            </section>

            <footer className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-[#d8ded8] pt-6 dark:border-[#35433b]">
              <p className="text-sm text-[#65756c] dark:text-[#9eadA3]">Predictive Delay Engine / Autonomous fleet systems</p>
              <Link
                href="/#portfolio"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#a9482e] hover:text-[#d25c3b] dark:text-[#f18a68]"
              >
                Explore my projects <ArrowUpRight className="h-4 w-4" />
              </Link>
            </footer>
        </article>
      </div>
    </main>
  )
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-4">
      <span className="text-xs font-semibold tracking-[0.12em] text-[#c25435] dark:text-[#f18a68]">{number}</span>
      <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">{title}</h2>
    </div>
  )
}

function DemoFigure({
  number,
  title,
  description,
  className,
  children,
}: {
  number: string
  title: string
  description: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <figure className={`min-w-0 border-y border-[#d8ded8] py-4 dark:border-[#35433b] ${className ?? ""}`}>
      <div className="relative aspect-video overflow-hidden bg-[#202622]">{children}</div>
      <figcaption className="pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#c25435] dark:text-[#f18a68]">
          {number} / {title}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#52645b] dark:text-[#b7c4bc]">{description}</p>
      </figcaption>
    </figure>
  )
}

function DelayLane({
  label,
  delay,
  tone,
  vehiclePositions,
}: {
  label: string
  delay: string
  tone: "green" | "red"
  vehiclePositions: string[]
}) {
  const laneColor = tone === "green" ? "bg-[#20a34a]" : "bg-[#d64b3b]"

  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-center justify-between gap-2 text-xs">
        <span className="font-medium text-[#52645b] dark:text-[#b7c4bc]">{label}</span>
        <span className="font-semibold text-[#192621] dark:text-[#edf2ed]">{delay}</span>
      </div>
      <div className="relative h-12 overflow-hidden bg-[#26312b]">
        <div className={`absolute inset-x-0 top-1/2 h-5 -translate-y-1/2 ${laneColor}`} />
        <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/60" />
        {vehiclePositions.map((position, index) => (
          <span
            key={`${position}-${index}`}
            className="absolute top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#1673d1] shadow-sm"
            style={{ left: position }}
          />
        ))}
        <span className="absolute right-2 top-1/2 z-10 h-6 w-6 -translate-y-1/2 rounded-full border-2 border-white/90" />
      </div>
    </div>
  )
}

function RoadVehicle({ position, color, index }: { position: string; color: string; index: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-0 top-[56%] z-10 h-7 w-12 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-white/80 shadow-md"
      style={{ left: position }}
    >
      <div className={`absolute inset-0 rounded-md ${color}`} />
      <div className="absolute right-1 top-1/2 h-3 w-5 -translate-y-1/2 rounded-sm bg-[#dcecf2]/90" />
      <div className="absolute right-0 top-1/2 h-2 w-1 -translate-y-1/2 rounded-l bg-white" />
      <span className="sr-only">Vehicle {index + 1} in the queue</span>
    </div>
  )
}

function ApplicationRow({ title, description }: { title: string; description: string }) {
  return (
    <div className="grid gap-2 border-b border-[#d8ded8] py-5 last:border-0 dark:border-[#35433b] sm:grid-cols-[190px_1fr] sm:gap-5">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-base">{description}</p>
    </div>
  )
}