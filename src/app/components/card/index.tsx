"use client";
import { useState } from "react";
import {
  addCard,
  useAddCard,
  useGetCardData,
  useUpdateCard,
} from "@/app/store/queries";
import "./card.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

const Card = () => {
  const { data } = useGetCardData();
  const { mutate: updateCard } = useUpdateCard();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleEdit = () => {
    const updatedCard = {
      id: data[currentIndex].id,
      question,
      answer,
    };
    updateCard(updatedCard);
    setIsDialogOpen(false);
  };

  const handleAddCard = async () => {
    const updateData = {
      question,
      answer,
    };
    await addCard(updateData);
    setIsDialogOpen(false);
    toast.success("New card added successfully");
  };

  if (!data) return null;

  return (
    <div className="wrapper">
      <div className="container">
        <div className="card">
          <div className="front">
            <h2>{data[currentIndex]?.question}</h2>
          </div>
          <div className="back">
            <h2>{data[currentIndex]?.answer}</h2>
          </div>
        </div>
      </div>
      <div className="btn-container">
        <button
          className="prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <button
          className="next"
          onClick={handleNext}
          disabled={currentIndex === data.length - 1}
        >
          Next
        </button>
      </div>
      <div className="btn-container">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="dialog-trigger edit">Edit</DialogTrigger>
          <DialogContent className="dialog-content">
            <DialogHeader className="dialog-header">
              <DialogTitle className="dialog-title">Edit Card</DialogTitle>
              <div className="dialog-body">
                <label className="dialog-label">Question</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Edit question"
                  className="dialog-input"
                />
                <label className="dialog-label">Answer</label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Edit answer"
                  className="dialog-input"
                />
                <button className="save-button" onClick={handleEdit}>
                  Save
                </button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="dialog-trigger add">Add</DialogTrigger>
          <DialogContent className="dialog-content">
            <DialogHeader className="dialog-header">
              <DialogTitle className="dialog-title">Add Card</DialogTitle>
              <div className="dialog-body">
                <label className="dialog-label">Question</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Edit question"
                  className="dialog-input"
                />
                <label className="dialog-label">Answer</label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Edit answer"
                  className="dialog-input"
                />
                <button className="save-button" onClick={handleAddCard}>
                  Add New Card
                </button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Card;
