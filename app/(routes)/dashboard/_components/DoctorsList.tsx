"use client";
import { Button } from "@/components/ui/button";
import { AIDoctorAgents } from "@/shared/list";
import Image from "next/image";
import React, { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import AddNewSession from "./AddNewSession";

export type Doctor = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId: string;
  subscriptionRequired?: boolean;
};

function DoctorsList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDialogOpen(true);
  };

  return (
    <div className="doclis mt-10">
      <h1 className="hed">CAREX'S</h1>
      <h2 className="text-2xl font-bold">AI Specialist Doctors Agents</h2>
      <div className="Doctors">
        {AIDoctorAgents.map((doctor: Doctor) => (
          <div
            key={doctor.id}
            className="Doc"
            onClick={() => handleDoctorClick(doctor)}
          >
            <div className="ig">
              <Image
                src={doctor.image}
                fill
                style={{ objectFit: "cover" }}
                alt={doctor.specialist}
                quality={100}
                className="docimg"
              />
            </div>
            <h2 className="dh2">{doctor.specialist}</h2>
            <p className="dp">{doctor.description}</p>
            <Button variant="outline" className="docton">
              Start Consultation
            </Button>
          </div>
        ))}
      </div>

      {/* Render AddNewSession with the selected doctor */}
      <AddNewSession
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        preSelectedDoctor={selectedDoctor}
      />
    </div>
  );
}

export default DoctorsList;
