"use client";
import React, { useState, useEffect, useRef } from "react";
import { ShieldAlert, Cpu, Users, Layers, Clock, HeartHandshake } from "lucide-react";

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

function Counter({ target, duration = 1500, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, duration, started]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function WhyChooseUs() {
  const stats = [
    { target: 100, suffix: "+", title: "Projects Completed" },
    { target: 50, suffix: "+", title: "Happy Clients" },
    { target: 10, suffix: "+", title: "Years Engineering Experience" },
    { target: 24, suffix: "/7", title: "Technical Support" },
  ];

  const features = [
    {
      title: "Experienced Engineering Team",
      desc: "Our operations are led directly by Er. Hanuman Yadav, ensuring structured project oversight and planning.",
      icon: <Users className="h-5 w-5 text-electric-blue" />,
    },
    {
      title: "Quality Materials",
      desc: "We specify and select standard materials from recognized brands to ensure long-term performance.",
      icon: <Layers className="h-5 w-5 text-electric-blue" />,
    },
    {
      title: "Safety First",
      desc: "Prioritizing compliance with standard electrical codes and safety rules to minimize operational hazards.",
      icon: <ShieldAlert className="h-5 w-5 text-electric-blue" />,
    },
    {
      title: "Timely Project Execution",
      desc: "Methodical execution schedules aimed at delivering project commissions within set timelines.",
      icon: <Clock className="h-5 w-5 text-electric-blue" />,
    },
    {
      title: "Technical Expertise",
      desc: "Deep knowledge in industrial panel boards, industrial automation, and solar grid installations.",
      icon: <Cpu className="h-5 w-5 text-electric-blue" />,
    },
    {
      title: "Reliable After-Sales Support",
      desc: "Dedicated support contracts and quick assistance to maintain the reliability of your electrical setups.",
      icon: <HeartHandshake className="h-5 w-5 text-electric-blue" />,
    },
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-slate-50 dark:bg-brand-dark/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold text-electric-blue uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-electric-blue" />
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Uncompromising Excellence in Power Systems
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-light">
            We bridge the gap between complex engineering requirements and safe, clean, reliable execution.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 shadow-sm text-center group hover:border-electric-blue/40 transition-all duration-300"
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-electric-blue dark:text-electric-yellow mb-2 tracking-tight">
                <Counter target={stat.target} suffix={stat.suffix} />
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {stat.title}
              </p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-card hover:shadow-md transition-all duration-300"
            >
              <div className="p-2.5 rounded-xl bg-electric-blue/10 text-electric-blue shrink-0">
                {feat.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
