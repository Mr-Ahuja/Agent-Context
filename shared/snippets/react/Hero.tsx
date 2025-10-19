import React from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import "./styles.css";

export const Hero: React.FC = () => {
  return (
    <section className="hero app-bg">
      <Card>
        <h1 style={{margin:0}}>CURLs Support</h1>
        <p style={{opacity:.8}}>Turn clunky, tracker‑stuffed URLs into clean, readable links.</p>
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          <Button variant="primary">Primary</Button>
          <Button>Secondary</Button>
        </div>
      </Card>
    </section>
  );
};

