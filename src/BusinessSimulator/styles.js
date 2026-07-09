const styles = {

background: {
minHeight: "100vh",
background:
"linear-gradient(135deg,#020617,#081225,#0f172a,#111827)",
padding: 30,
fontFamily: "Arial",
color: "white",
},

container: {
display: "grid",
gridTemplateColumns: "340px 1fr",
gap: 25,
},

left: {
display: "flex",
flexDirection: "column",
gap: 20,
},

right: {},

welcomeCard: {
maxWidth: 650,
margin: "60px auto",
background: "#111827",
padding: 40,
borderRadius: 30,
boxShadow: "0 0 35px rgba(0,255,255,.15)",
textAlign: "center",
},

title: {
fontSize: 42,
color: "#22d3ee",
marginBottom: 10,
},

subtitle: {
color: "#94a3b8",
marginBottom: 30,
fontSize: 18,
},

input: {
width: "100%",
padding: 18,
fontSize: 18,
background: "#020617",
border: "1px solid #334155",
borderRadius: 15,
color: "white",
},

button: {
width: "100%",
padding: 18,
marginTop: 25,
fontSize: 20,
fontWeight: "bold",
border: "none",
borderRadius: 15,
cursor: "pointer",
background:
"linear-gradient(90deg,#06b6d4,#2563eb)",
color: "white",
},

panel: {
background: "#111827",
padding: 20,
borderRadius: 22,
boxShadow: "0 0 25px rgba(0,255,255,.12)",
},

question: {
background: "#111827",
padding: 30,
borderRadius: 25,
boxShadow: "0 0 25px rgba(0,255,255,.12)",
},

option: {
width: "100%",
padding: 18,
marginTop: 15,
background: "#1e293b",
border: "1px solid #334155",
borderRadius: 15,
color: "white",
fontSize: 17,
cursor: "pointer",
transition: ".3s",
},

bar: {
width: "100%",
height: 12,
background: "#1e293b",
borderRadius: 30,
overflow: "hidden",
marginTop: 5,
},

fill: {
height: "100%",
transition: "width .5s",
},

timer: {
height: 14,
background: "#1e293b",
borderRadius: 20,
overflow: "hidden",
marginBottom: 25,
},

timerFill: (time) => ({
height: "100%",
width: `${time * 5}%`,
background:
time > 10
? "#22d3ee"
: time > 5
? "#f59e0b"
: "#ef4444",
transition: ".5s",
}),

feedback: {
marginTop: 25,
padding: 20,
borderRadius: 20,
background: "#0f172a",
border: "1px solid #334155",
},

score: {
marginTop: 20,
fontSize: 28,
fontWeight: "bold",
color: "#22d3ee",
textAlign: "center",
},

result: {
maxWidth: 900,
margin: "30px auto",
background: "#111827",
padding: 40,
borderRadius: 30,
boxShadow: "0 0 40px rgba(0,255,255,.18)",
},

resultTitle: {
fontSize: 40,
color: "#22d3ee",
textAlign: "center",
marginBottom: 30,
},

playAgain: {
marginTop: 35,
padding: 18,
width: "100%",
fontSize: 20,
border: "none",
borderRadius: 15,
cursor: "pointer",
background:
"linear-gradient(90deg,#22d3ee,#2563eb)",
color: "white",
fontWeight: "bold",
}

};

export default styles;
