import { useState, useEffect, useRef } from "react";

const COLORS = {
  lavender: "#EDE4F5",
  lavenderLight: "#F5F0FA",
  lavenderDeep: "#D8C8EB",
  purple: "#6B4EAB",
  purpleDark: "#1E1541",
  navy: "#14102B",
  white: "#FFFFFF",
  amber: "#E8A838",
  amberLight: "#FFF3DD",
  red: "#C94444",
  redLight: "#FDEAEA",
  green: "#3A9E6B",
  greenLight: "#E8F5EE",
  gray: "#8E8A9E",
  grayLight: "#F7F5FA",
  text: "#1A1135",
  textMuted: "#6B667A",
};

const psychSteps = [
  { screen: "Landing Page", label: "\"Split your rent, stress less\"", delta: "+15", cumulative: 65, note: "Clear value prop. Phone number is low friction. User arrives motivated.", color: COLORS.green, img: "/screen-1-landing.png" },
  { screen: "Create Account", label: "Name + Email", delta: "-5", cumulative: 60, note: "Standard form, progress bar barely visible. The user hasn't received anything yet.", color: COLORS.amber, img: "/screen-2-account.png" },
  { screen: "Find Your Address", label: "Address search", delta: "-10", cumulative: 50, note: "Binary pass/fail. If address doesn't match Flex's database — dead end, no fallback.", color: COLORS.amber, img: "/screen-3-address.png" },
  { screen: "Portal Question", label: "\"Does your property have a portal?\"", delta: "-10", cumulative: 40, note: "Asks the user to know their property's payment infrastructure. The user's motivation is unchanged, but their ability to answer drops sharply. \"I'm not sure\" routes to the hardest path.", color: COLORS.red, img: "/screen-4-portal.png" },
  { screen: "Bank Account Explainer", label: "\"You'll pay using a Flex bank account\"", delta: "-15", cumulative: 25, note: "Heavy new concept. Excludes Venmo, Zelle, CashApp. The user still wants to split rent (motivation intact), but mental effort spikes: \"what is a Flex bank account and why do I need one?\" No social proof, no savings estimate, nothing to offset the confusion.", color: COLORS.red, img: "/screen-5-bank.png" },
  { screen: "Credit Check", label: "\"Hang tight...\"", delta: "-5", cumulative: 20, note: "SSN-level access requested. Loading screen. This is rent, so anxiety peaks here.", color: COLORS.red, img: "/screen-6-credit.png" },
  { screen: "Denial", label: "\"We can't offer you a Flex Rent line of credit\"", delta: "-30", cumulative: -10, note: "Dead end. The screen offers nothing actionable. \"Failure to identify applicant\" means the bureau couldn't match the user's name/SSN/address, likely because they move often or have a thin file. Flex's verification stack is built for prime credit, but its ICP skews toward exactly the renters prime credit excludes.", color: COLORS.red, img: "/screen-7-denial.png" },
];

function PsychBar({ step, index, isVisible }) {
  const [expanded, setExpanded] = useState(false);
  const maxVal = 70;
  const barWidth = Math.abs(step.cumulative) / maxVal * 100;
  const isNegative = step.cumulative < 0;

  return (
    <div style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.5s ease ${index * 0.08}s`,
      marginBottom: 24,
    }}>
      <div style={{ display: "flex", gap: 14 }}>
        {/* Thumbnail */}
        {step.img && (
          <div
            onClick={() => setExpanded(!expanded)}
            style={{
              width: 56,
              height: 56,
              borderRadius: 8,
              overflow: "hidden",
              border: `2px solid ${step.color}44`,
              cursor: "pointer",
              flexShrink: 0,
              position: "relative",
              marginTop: 2,
            }}
          >
            <img
              src={step.img}
              alt={step.screen}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
              }}
            />
            <div style={{
              position: "absolute",
              bottom: 2,
              right: 2,
              width: 14,
              height: 14,
              borderRadius: 3,
              background: COLORS.navy + "aa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              color: COLORS.white,
            }}>
              {expanded ? "−" : "+"}
            </div>
          </div>
        )}
        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: COLORS.textMuted,
                minWidth: 18,
              }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 17,
                color: COLORS.text,
              }}>
                {step.screen}
              </span>
            </div>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 13,
              color: step.color,
              fontWeight: 600,
            }}>
              {step.delta}
            </span>
          </div>
          <div style={{
            background: COLORS.lavender,
            borderRadius: 4,
            height: 8,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: isNegative ? `${50 - barWidth/2}%` : 0,
              height: "100%",
              width: isVisible ? `${Math.min(barWidth, 100)}%` : "0%",
              background: isNegative
                ? `linear-gradient(90deg, ${COLORS.red}, ${COLORS.red}88)`
                : `linear-gradient(90deg, ${step.color}cc, ${step.color}66)`,
              borderRadius: 4,
              transition: `width 0.8s ease ${index * 0.1 + 0.3}s`,
            }} />
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: COLORS.textMuted,
            marginTop: 6,
            lineHeight: 1.5,
          }}>
            {step.note}
          </p>
        </div>
      </div>
      {/* Expanded screenshot */}
      {expanded && step.img && (
        <div
          onClick={() => setExpanded(false)}
          style={{
            marginTop: 12,
            borderRadius: 10,
            overflow: "hidden",
            border: `1px solid ${COLORS.lavenderDeep}`,
            cursor: "pointer",
            maxHeight: 400,
          }}
        >
          <img
            src={step.img}
            alt={step.screen}
            style={{
              width: "100%",
              display: "block",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </div>
  );
}

function SectionNumber({ n }) {
  return (
    <span style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: 12,
      color: COLORS.purple,
      letterSpacing: 2,
      textTransform: "uppercase",
      display: "block",
      marginBottom: 10,
    }}>
      {n}
    </span>
  );
}

function Pullquote({ children, accent = false }) {
  return (
    <blockquote style={{
      borderLeft: `3px solid ${accent ? COLORS.amber : COLORS.purple}`,
      paddingLeft: 24,
      margin: "32px 0",
      fontFamily: "'Instrument Serif', Georgia, serif",
      fontSize: 20,
      lineHeight: 1.5,
      color: COLORS.text,
      fontStyle: "italic",
    }}>
      {children}
    </blockquote>
  );
}

function StatCard({ stat, label, sublabel, color = COLORS.purple }) {
  return (
    <div style={{
      background: COLORS.white,
      borderRadius: 12,
      padding: "24px 20px",
      textAlign: "center",
      border: `1px solid ${COLORS.lavenderDeep}`,
      flex: 1,
      minWidth: 140,
    }}>
      <div style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 36,
        color,
        lineHeight: 1,
        marginBottom: 6,
      }}>
        {stat}
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        color: COLORS.text,
        fontWeight: 600,
      }}>
        {label}
      </div>
      {sublabel && (
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          color: COLORS.textMuted,
          marginTop: 4,
        }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}

function ExperimentCard({ num, title, change, metric, effort, children }) {
  return (
    <div style={{
      background: COLORS.white,
      borderRadius: 12,
      padding: 28,
      border: `1px solid ${COLORS.lavenderDeep}`,
      marginBottom: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{
          background: COLORS.purple,
          color: COLORS.white,
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          padding: "4px 10px",
          borderRadius: 20,
          fontWeight: 600,
        }}>
          EXP {num}
        </span>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: COLORS.textMuted,
        }}>
          {effort}
        </span>
      </div>
      <h4 style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 20,
        color: COLORS.text,
        margin: "0 0 8px 0",
        fontWeight: 400,
      }}>
        {title}
      </h4>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        color: COLORS.textMuted,
        lineHeight: 1.6,
        margin: "0 0 14px 0",
      }}>
        {children}
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{
          background: COLORS.lavenderLight,
          borderRadius: 8,
          padding: "8px 14px",
          flex: 1,
          minWidth: 150,
        }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: COLORS.textMuted, marginBottom: 2, textTransform: "uppercase", letterSpacing: 1 }}>
            Change
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.text }}>
            {change}
          </div>
        </div>
        <div style={{
          background: COLORS.lavenderLight,
          borderRadius: 8,
          padding: "8px 14px",
          flex: 1,
          minWidth: 150,
        }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: COLORS.textMuted, marginBottom: 2, textTransform: "uppercase", letterSpacing: 1 }}>
            Metric
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.text }}>
            {metric}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineStep({ week, title, children, isLast }) {
  return (
    <div style={{ display: "flex", gap: 20, marginBottom: isLast ? 0 : 8 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 40 }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: COLORS.purple,
          color: COLORS.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          fontWeight: 600,
          flexShrink: 0,
        }}>
          {week}
        </div>
        {!isLast && (
          <div style={{ width: 2, flex: 1, background: COLORS.lavenderDeep, minHeight: 40 }} />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 24 }}>
        <h4 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 17,
          color: COLORS.text,
          margin: "4px 0 6px 0",
          fontWeight: 400,
        }}>
          {title}
        </h4>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: COLORS.textMuted,
          lineHeight: 1.6,
          margin: 0,
        }}>
          {children}
        </p>
      </div>
    </div>
  );
}

function useOnScreen(ref) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [ref]);
  return isVisible;
}

function Section({ children, id }) {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  return (
    <section
      ref={ref}
      id={id}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s ease",
      }}
    >
      {children}
    </section>
  );
}

export default function FlexTeardown() {
  const psychRef = useRef(null);
  const psychVisible = useOnScreen(psychRef);
  const [activeNav, setActiveNav] = useState(0);

  const navItems = [
    { label: "The Walk-Through", id: "walkthrough" },
    { label: "Finding #1", id: "finding1" },
    { label: "Finding #2", id: "finding2" },
    { label: "The Habit", id: "habit" },
    { label: "The System", id: "system" },
    { label: "90-Day Plan", id: "plan" },
  ];

  useEffect(() => {
    const handler = () => {
      const sections = navItems.map(n => document.getElementById(n.id));
      const scrollY = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollY) {
          setActiveNav(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{
      background: COLORS.lavenderLight,
      minHeight: "100vh",
      fontFamily: "'DM Sans', sans-serif",
      color: COLORS.text,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* ========= HERO ========= */}
      <header style={{
        background: COLORS.lavender,
        padding: "80px 24px 60px",
        textAlign: "center",
        borderBottom: `1px solid ${COLORS.lavenderDeep}`,
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: COLORS.purple,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 24,
          }}>
            Onboarding Teardown
          </div>
          <h1 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: COLORS.navy,
            margin: "0 0 20px 0",
          }}>
            I went through your onboarding.
            <br />
            <span style={{ color: COLORS.purple }}>Then I got denied.</span>
          </h1>
          <p style={{
            fontSize: 16,
            color: COLORS.textMuted,
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "0 auto 32px",
          }}>
            A first-person teardown of Flex's signup-to-activation funnel, built on 7 screens, 1 real denial, and 3,400+ user reviews.
          </p>
          <div style={{
            background: COLORS.white,
            borderRadius: 12,
            padding: "20px 24px",
            maxWidth: 520,
            margin: "0 auto 28px",
            border: `1px solid ${COLORS.lavenderDeep}`,
            textAlign: "left",
          }}>
            <p style={{
              fontSize: 14,
              color: COLORS.text,
              lineHeight: 1.7,
              margin: 0,
            }}>
              <strong>The punchline:</strong> Flex's onboarding leaks at two specific points after the signup screens end. A dead-end denial that excludes thin-credit-file renters with no re-entry path. And a hidden second onboarding for non-integrated properties that happens outside the app, unguided. Four experiments would close both gaps. The walkthrough below is the evidence.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {["7 screens walked", "1 real denial", "3,400+ reviews mined", "4 synthetic user profiles"].map((tag) => (
              <span key={tag} style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.lavenderDeep}`,
                borderRadius: 20,
                padding: "6px 16px",
                fontSize: 12,
                fontFamily: "'DM Mono', monospace",
                color: COLORS.textMuted,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ========= STICKY NAV ========= */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: `${COLORS.white}ee`,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${COLORS.lavenderDeep}`,
        padding: "0 24px",
        overflowX: "auto",
      }}>
        <div style={{
          maxWidth: 680,
          margin: "0 auto",
          display: "flex",
          gap: 0,
        }}>
          {navItems.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                padding: "14px 16px",
                fontSize: 12,
                fontFamily: "'DM Mono', monospace",
                color: activeNav === i ? COLORS.purple : COLORS.textMuted,
                textDecoration: "none",
                borderBottom: activeNav === i ? `2px solid ${COLORS.purple}` : "2px solid transparent",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ========= CONTENT ========= */}
      <main style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* ---- THE PREMISE ---- */}
        <Section>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text, marginBottom: 20 }}>
            Flex's onboarding looks clean on the surface. Six screens, minimal fields, calming palette.
            But the surface hides structural breaks that don't show up in signup-rate dashboards, because
            they happen <em>after</em> the screens end.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text, marginBottom: 20 }}>
            I know because I went through the flow myself. I entered my real phone number, my real name, my real address,
            and consented to a credit check. I waited through a loading screen while Flex connected to my credit profile.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text, fontWeight: 600 }}>
            Then I hit a wall.
          </p>
        </Section>

        <div style={{ height: 48 }} />

        {/* ---- PSYCH SCORE ---- */}
        <Section id="walkthrough">
          <SectionNumber n="01 — The Walk-Through" />
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 30,
            fontWeight: 400,
            color: COLORS.navy,
            margin: "0 0 8px 0",
          }}>
            Psych score trajectory
          </h2>
          <p style={{
            fontSize: 14,
            color: COLORS.textMuted,
            marginBottom: 32,
            lineHeight: 1.6,
          }}>
            Every screen adds or subtracts emotional energy. Users arrive at ~50 (they sought out Flex because they need help with rent). The score tracks cumulative willingness to continue. Below zero, the user is more likely to quit than proceed.
          </p>

          <div ref={psychRef} style={{
            background: COLORS.white,
            borderRadius: 16,
            padding: "32px 28px",
            border: `1px solid ${COLORS.lavenderDeep}`,
            marginBottom: 24,
          }}>
            {psychSteps.map((step, i) => (
              <PsychBar key={i} step={step} index={i} isVisible={psychVisible} />
            ))}
          </div>

          <Pullquote>
            The highest-friction screens ask for the most and explain the least. By screen 7, the user has given their phone, name, email, address, and credit authorization — and received zero value in return.
          </Pullquote>
        </Section>

        <div style={{ height: 56 }} />

        {/* ---- FINDING 1 ---- */}
        <Section id="finding1">
          <SectionNumber n="02 — Finding" />
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 30,
            fontWeight: 400,
            color: COLORS.navy,
            margin: "0 0 24px 0",
          }}>
            Zero screens between denial and churn.
          </h2>

          <div style={{
            background: COLORS.redLight,
            borderRadius: 12,
            padding: 24,
            marginBottom: 24,
            border: `1px solid ${COLORS.red}22`,
          }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: COLORS.red, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
              What the user sees
            </div>
            <p style={{ fontSize: 15, color: COLORS.text, margin: 0, lineHeight: 1.6 }}>
              "We can't offer you a Flex Rent line of credit at this time. Check your email for more information about this decision."
            </p>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: COLORS.red, marginBottom: 8, marginTop: 20, textTransform: "uppercase", letterSpacing: 1 }}>
              What the email says
            </div>
            <p style={{ fontSize: 15, color: COLORS.text, margin: 0, lineHeight: 1.6 }}>
              "We are unable to offer you an account for the following reason: <strong>Failure to identify applicant.</strong>"
            </p>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.text, marginBottom: 16 }}>
            "Failure to identify applicant" almost certainly means a thin credit file. The user's creditworthiness 
            isn't the issue; the bureau just doesn't have enough data to confirm their identity. 
            This lands hardest on immigrants and young renters with limited U.S. credit 
            history, who also happen to be the fastest-growing renter segments.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.text, marginBottom: 28 }}>
            The denial screen is a dead end. It doesn't offer remediation steps or an alternative verification path. 
            There's no waitlist, and nothing re-engages the user when their situation changes. They're a row in a database that will 
            never convert unless they independently decide to come back and try again.
          </p>

          <div style={{
            display: "flex",
            gap: 12,
            marginBottom: 32,
            flexWrap: "wrap",
          }}>
            <StatCard stat="0" label="Re-engagement paths" sublabel="after denial" color={COLORS.red} />
            <StatCard stat="0" label="Alternative verification" sublabel="options offered" color={COLORS.red} />
            <StatCard stat="∞" label="Reactivation cost" sublabel="from zero baseline" color={COLORS.amber} />
          </div>

          <Pullquote accent>
            This maps to the JD's "Reactivated Users" KPI. These users were never activated in the first place, and many of them could be, given a different verification path.
          </Pullquote>

          <h3 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 21,
            fontWeight: 400,
            color: COLORS.navy,
            margin: "32px 0 8px 0",
          }}>
            Why does this happen?
          </h3>
          <div style={{
            background: COLORS.grayLight,
            borderRadius: 12,
            padding: "20px 24px",
            marginBottom: 28,
            fontSize: 13,
            fontFamily: "'DM Mono', monospace",
            color: COLORS.text,
            lineHeight: 2,
          }}>
            Denied → identity verification failed<br/>
            → name/SSN/address mismatch with credit bureau<br/>
            → renters move often, thin or mismatched files<br/>
            → <span style={{ color: COLORS.purple, fontWeight: 500 }}>Flex's verification stack is built for prime credit, but its ICP skews toward renters prime credit excludes</span>
          </div>

          <h3 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 21,
            fontWeight: 400,
            color: COLORS.navy,
            margin: "0 0 16px 0",
          }}>
            What an intern could test
          </h3>

          <ExperimentCard
            num="01"
            title="Secondary Verification Before Hard Denial"
            change="Offer ID upload or bank-statement verification for identity failures before rejecting"
            metric="Approval rate lift for thin-file segment"
            effort="2–3 weeks — flow + eng"
          >
            Better denial copy is a surface fix. The deeper wedge: if the credit bureau can't verify identity, 
            offer a secondary path (document upload, bank statement, government ID) before issuing a hard denial. 
            Reserve the dead-end screen for credit-quality failures only.
          </ExperimentCard>

          <ExperimentCard
            num="02"
            title="Waitlist with Re-check Trigger"
            change="Replace dead-end with opt-in waitlist, quarterly re-verification"
            metric="Reactivation rate from waitlist"
            effort="2 weeks — backend + notification"
          >
            Instead of a wall, offer: "We'll notify you when we can verify your identity." 
            Re-check when the user's credit bureau file updates. Convert a pure outflow into a recyclable stock.
          </ExperimentCard>
        </Section>

        <div style={{ height: 56 }} />

        {/* ---- FINDING 2 ---- */}
        <Section id="finding2">
          <SectionNumber n="03 — Finding" />
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 30,
            fontWeight: 400,
            color: COLORS.navy,
            margin: "0 0 24px 0",
          }}>
            After approval, the onboarding splits into two different products.
          </h2>

          <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
            {/* Integrated */}
            <div style={{
              flex: 1,
              minWidth: 260,
              background: COLORS.greenLight,
              borderRadius: 12,
              padding: 24,
              border: `1px solid ${COLORS.green}22`,
            }}>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: COLORS.green,
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}>
                Path A — Integrated Property
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.8, color: COLORS.text }}>
                <li>Flex connects directly to rent portal</li>
                <li>Rent charges flow in automatically</li>
                <li>User does nothing except make payments</li>
                <li style={{ fontWeight: 600 }}>This is the experience the marketing promises</li>
              </ul>
              <p style={{ fontSize: 12, color: COLORS.textMuted, fontStyle: "italic", margin: "12px 0 0 0", lineHeight: 1.5 }}>
                "First, they annoyed me with some mistakes and glitches, but I was very impressed with how efficient they were in fixing any existing issues." — Maya T., WalletHub
              </p>
            </div>
            {/* Non-integrated */}
            <div style={{
              flex: 1,
              minWidth: 260,
              background: COLORS.redLight,
              borderRadius: 12,
              padding: 24,
              border: `1px solid ${COLORS.red}22`,
            }}>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: COLORS.red,
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}>
                Path B — Non-Integrated Property
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.8, color: COLORS.text }}>
                <li>User receives Flex bank account credentials</li>
                <li>Must log into their property portal separately</li>
                <li>Must add Flex bank as a new payment method</li>
                <li>May wait 1–3 days for bank verification</li>
                <li>Must manually submit rent each month</li>
                <li style={{ fontWeight: 600 }}>This is a second, unguided onboarding on someone else's platform</li>
              </ul>
            </div>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.text, marginBottom: 16 }}>
            The word "approved" creates a false plateau. For non-integrated users, approval is the midpoint. 
            The remaining steps happen outside Flex's app, on someone else's website, using credentials the user 
            has never seen before. The Flex help center has 5+ articles dedicated to troubleshooting this path alone. 
            The volume of support content is itself evidence of friction.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.text, marginBottom: 12 }}>
            Meanwhile, some users who never complete this second onboarding continue to be billed $14.99/month 
            for a service they've never used, because cancellation requires emailing support. 
            Exit is harder than entry.
          </p>
          <p style={{ fontSize: 12, color: COLORS.textMuted, fontStyle: "italic", marginBottom: 28, lineHeight: 1.5, paddingLeft: 20, borderLeft: `2px solid ${COLORS.lavenderDeep}` }}>
            "I've been paying Flex 14.99 since May, and I haven't been using it because I tried to cancel, but for some odd reason, it didn't get canceled." — Dana B., PissedConsumer
          </p>

          <ExperimentCard
            num="03"
            title="Guided Portal Setup"
            change="Replace 'here are your bank details' with step-by-step in-app walkthrough"
            metric="Portal setup completion within 48 hours of approval"
            effort="3–4 weeks — product + eng"
          >
            After approval for non-integrated users, walk them through portal setup with their specific portal type 
            (Yardi, RealPage, AppFolio). Track completion. Send a "have you added Flex to your portal yet?" 
            push notification at 24 and 48 hours.
          </ExperimentCard>

          <ExperimentCard
            num="04"
            title="Pre-Approval Compatibility Check"
            change="Surface bank and property eligibility before the credit check, so blockers appear early"
            metric="Reduction in post-approval churn from technical blockers"
            effort="2–3 weeks — flow reorder"
          >
            Users who discover their bank doesn't work with Plaid should find out before they've given their SSN. 
            Fail fast, fail cheap. Raise the psych score floor by eliminating the scenarios where users 
            invest maximum data and receive zero value. One user reported being "initially told they didn't support my bank when the whole time they did, it was just under another name" (N. Hammes, ComplaintsBoard).
          </ExperimentCard>
        </Section>

        <div style={{ height: 56 }} />

        {/* ---- HABIT FORMATION ---- */}
        <Section id="habit">
          <SectionNumber n="04 — The Habit" />
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 30,
            fontWeight: 400,
            color: COLORS.navy,
            margin: "0 0 24px 0",
          }}>
            Rent has the strongest possible habit cue. Is Flex using it?
          </h2>

          <div style={{
            background: COLORS.white,
            borderRadius: 16,
            padding: 28,
            border: `1px solid ${COLORS.lavenderDeep}`,
            marginBottom: 24,
          }}>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                { label: "Cue", value: "1st of the month + rent-anxiety", icon: "🔔" },
                { label: "Routine", value: "Open Flex → confirm payment", icon: "🔄" },
                { label: "Reward", value: "Debit confirmation + on-time credit reporting", icon: "✓" },
              ].map((item) => (
                <div key={item.label} style={{ flex: 1, minWidth: 160 }}>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: COLORS.purple,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 8,
                  }}>
                    {item.label}
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: COLORS.text,
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.text, marginBottom: 16 }}>
            A working habit metric for Flex: <strong>3 on-time payments within 3 months</strong> (N=3, T=3mo). 
            Monthly rent is one of the cleanest habit cases in fintech. The time cue is fixed (1st of the month), 
            the emotional cue is strong (anxiety about late fees), and confirmation is immediate.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.text, marginBottom: 0 }}>
            Path B users who never complete portal setup never reach N=1. They can't enter the habit loop at all. 
            That's why the portal-setup friction from Finding #2 is more damaging than it first appears: 
            it doesn't just delay the first payment, it prevents the habit from ever forming.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textMuted, marginTop: 16, marginBottom: 0, fontStyle: "italic" }}>
            One signal worth instrumenting: Flex reports on-time payments to TransUnion, so users have a reason 
            to open the app between rent payments to check credit-building progress. If mid-month credit-check 
            frequency predicts Month 3 retention better than first-payment completion alone, that's a leading 
            retention indicator the onboarding experience could reinforce.
          </p>
        </Section>

        <div style={{ height: 56 }} />

        {/* ---- SYSTEM VIEW ---- */}
        <Section id="system">
          <SectionNumber n="05 — The System" />
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 30,
            fontWeight: 400,
            color: COLORS.navy,
            margin: "0 0 24px 0",
          }}>
            Where these problems sit in the growth model.
          </h2>

          <div style={{
            background: COLORS.white,
            borderRadius: 16,
            padding: 28,
            border: `1px solid ${COLORS.lavenderDeep}`,
            marginBottom: 28,
          }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: COLORS.textMuted, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
              Growth Lever Decomposition
            </div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 13,
              color: COLORS.text,
              lineHeight: 2.2,
              overflowX: "auto",
            }}>
              <span style={{ color: COLORS.textMuted }}>Activated Users</span> =<br />
              &nbsp;&nbsp;Visitors × Signup Rate × <span style={{ background: COLORS.amberLight, padding: "2px 6px", borderRadius: 4 }}>Approval Rate</span> ×<br />
              &nbsp;&nbsp;(<span style={{ background: COLORS.greenLight, padding: "2px 6px", borderRadius: 4 }}>Integrated Setup</span> + <span style={{ background: COLORS.redLight, padding: "2px 6px", borderRadius: 4 }}>Non-Integrated Setup</span>) ×<br />
              &nbsp;&nbsp;Successful Delivery to Landlord within T days
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textMuted, marginTop: 12, lineHeight: 1.6 }}>
              T = P75 of historical days-from-approval-to-first-payment. Expectation: integrated T is much shorter than non-integrated T. That gap is the analytics gap. Today both paths are likely measured as one funnel.
            </p>
            <p style={{ fontSize: 12, color: COLORS.textMuted, fontStyle: "italic", margin: "10px 0 0 0", lineHeight: 1.5, paddingLeft: 16, borderLeft: `2px solid ${COLORS.lavenderDeep}` }}>
              Why "delivery to landlord" and not "first payment"? Because the trust-destroying failures happen after Flex pulls funds but before the landlord receives them. "Flex took my money in October and didn't pay my rent." — Sean B., WalletHub
            </p>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { color: COLORS.amber, bg: COLORS.amberLight, label: "Approval Rate", desc: "Finding #1 — Denied users have zero re-engagement path" },
                { color: COLORS.red, bg: COLORS.redLight, label: "Non-Integrated Setup", desc: "Finding #2 — Actions happen outside Flex's app. Invisible to dashboards." },
                { color: COLORS.green, bg: COLORS.greenLight, label: "Integrated Setup", desc: "This works. Lower priority than the post-approval breaks." },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: item.color,
                    marginTop: 5,
                    flexShrink: 0,
                  }} />
                  <div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.text }}>
                      {item.label}:
                    </span>{" "}
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textMuted }}>
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: COLORS.white,
            borderRadius: 16,
            padding: 28,
            border: `1px solid ${COLORS.lavenderDeep}`,
          }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: COLORS.textMuted, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
              The Missing Feedback Loop
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.text, margin: "0 0 18px 0" }}>
              Two types of churn are currently treated as one:
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 18 }}>
              <div style={{ flex: 1, minWidth: 220, background: COLORS.grayLight, borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
                  Involuntary churn
                </div>
                <p style={{ fontSize: 13, color: COLORS.text, margin: 0, lineHeight: 1.6 }}>
                  <strong>Denied users.</strong> Identity verification failed. They didn't choose to leave. 
                  Recovery play: re-check trigger when credit bureau data updates, or offer secondary verification.
                </p>
              </div>
              <div style={{ flex: 1, minWidth: 220, background: COLORS.grayLight, borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
                  Voluntary churn
                </div>
                <p style={{ fontSize: 13, color: COLORS.text, margin: 0, lineHeight: 1.6 }}>
                  <strong>Approved, never activated.</strong> They made it through but didn't finish setup. 
                  Recovery play: plot resurrection probability vs. days-since-approval to find the inflection point, 
                  then fire outreach before the user crosses it.
                </p>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.text, margin: "0 0 14px 0" }}>
              The $14.99 subscription billing on approved-never-activated users is a billing inversion: 
              monetization is running before value generation. Flex is trading short-term subscription revenue 
              on these users against long-term reactivation TAM. The question worth answering is whether 
              that trade pays off at the current activation rate.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textMuted, margin: 0, fontStyle: "italic" }}>
              This is the "Reactivated Users" KPI the JD calls out. Right now, every failed onboarding is a permanent loss. A feedback loop here turns that outflow into a recyclable stock.
            </p>
          </div>
        </Section>

        <div style={{ height: 56 }} />

        {/* ---- 90 DAY PLAN ---- */}
        <Section id="plan">
          <SectionNumber n="06 — 90-Day Plan" />
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 30,
            fontWeight: 400,
            color: COLORS.navy,
            margin: "0 0 28px 0",
          }}>
            What I'd ship in the first 90 days.
          </h2>

          <div style={{
            background: COLORS.white,
            borderRadius: 16,
            padding: 32,
            border: `1px solid ${COLORS.lavenderDeep}`,
            marginBottom: 32,
          }}>
            <TimelineStep week="W1" title="Instrument the invisible funnel">
              Map every post-approval event for non-integrated users. How many complete portal setup within 48 hours? 
              How many finish bank verification? Pull denial data: what % are "failure to identify" vs. 
              credit quality, and how many ever re-apply? Pull a histogram of days-from-approval-to-first-payment 
              and set T at P75, segmented by integrated vs. non-integrated. That gap is the first finding.
            </TimelineStep>
            <TimelineStep week="W3" title="Ship Experiment 01 — Secondary Verification Path">
              Build the document-upload or bank-statement verification path for thin-file rejections. 
              Route identity failures through it before the hard denial screen. Track approval-rate 
              lift on the previously-rejected segment.
            </TimelineStep>
            <TimelineStep week="W5" title="Ship Experiment 03 — Guided Portal Setup">
              For non-integrated users, replace "here are your bank details" with a step-by-step guided checklist 
              tailored to the top 3 portal types (Yardi, RealPage, AppFolio). Track completion rate. 
              Push notification at 24h and 48h.
            </TimelineStep>
            <TimelineStep week="W8" title="Pull results, find the resurrection inflection point">
              Analyze both experiments. For approved-never-activated users, plot resurrection probability 
              against days since approval to find the inflection point. That tells you the optimal day to fire 
              outreach — early enough that the user is still warm, late enough that you're not nagging.
            </TimelineStep>
            <TimelineStep week="W10" title="Build the segmented growth model" isLast>
              Using experiment data, build a growth model that shows projected activated users under two 
              scenarios: current state (single funnel, same onboarding for everyone) vs. segmented state 
              (different paths, different activation metrics, different T for each). This is the deliverable 
              that makes the case for continued investment.
            </TimelineStep>
          </div>
        </Section>

        <div style={{ height: 56 }} />

        {/* ---- WHY ME ---- */}
        <Section>
          <div style={{
            background: COLORS.lavender,
            borderRadius: 16,
            padding: 32,
          }}>
            <SectionNumber n="07 — Why Me" />
            <h2 style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 24,
              fontWeight: 400,
              color: COLORS.navy,
              margin: "0 0 20px 0",
            }}>
              Sidharth Sundaram
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.text, margin: 0 }}>
                <strong>4 years as a B2B2C product manager.</strong> Built onboarding flows where activation required 
                coordinating between a business buyer and an end user. Same two-sided structure as Flex's 
                integrated / non-integrated property split. Ran an experiment that generated $200K in incremental revenue 
                by replacing a sales-rep dependency with scalable assets. Same pattern applies here.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.text, margin: 0 }}>
                <strong>Runs the experimentation stack.</strong> Funnel analysis, segmentation, A/B testing, 
                B=MAT behavioral framework. I instrument first, experiment second, and commit third. That approach 
                comes from four years of doing it.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.text, margin: 0 }}>
                <strong>MS Engineering Management, Purdue University.</strong> Authorized to work via CPT (standard 
                employer cooperation letter only, no sponsorship required).
              </p>
            </div>
            <div style={{
              marginTop: 24,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}>
              {[
                { label: "Portfolio", href: "https://sidharthsundaram.com" },
                { label: "LinkedIn", href: "https://linkedin.com/in/sidharthsundaram" },
                { label: "sundar84@purdue.edu", href: "mailto:sundar84@purdue.edu" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: COLORS.purple,
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: 8,
                    background: COLORS.white,
                    border: `1px solid ${COLORS.lavenderDeep}`,
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = COLORS.purple;
                    e.target.style.color = COLORS.white;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = COLORS.white;
                    e.target.style.color = COLORS.purple;
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </Section>

        <div style={{ height: 40 }} />

        {/* ---- FOOTER ---- */}
        <footer style={{ textAlign: "center", paddingBottom: 40 }}>
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: COLORS.textMuted,
          }}>
            Built from public signal only. Imagine what I build with access to your data.
          </p>
        </footer>
      </main>
    </div>
  );
}
