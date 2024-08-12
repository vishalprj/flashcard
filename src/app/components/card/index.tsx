"use client";
import { useState } from "react";
import {
  deleteCard,
  useAddCard,
  useGetCardData,
  useUpdateCard,
} from "@/app/store/queries";
import "./card.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

const Card = () => {
  const { data } = useGetCardData();
  const { mutate: updateCard } = useUpdateCard();
  const { mutate: addCard } = useAddCard();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

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

  const openEditDialog = () => {
    setQuestion(data[currentIndex]?.question || "");
    setAnswer(data[currentIndex]?.answer || "");
    setIsEditDialogOpen(true);
  };

  const handleEdit = () => {
    const updatedCard = {
      id: data[currentIndex].id,
      question,
      answer,
    };
    updateCard(updatedCard);
    setIsEditDialogOpen(false);
  };

  const handleAddCard = async () => {
    const newCard = {
      question,
      answer,
    };
    addCard(newCard);
    setIsAddDialogOpen(false);
  };

  const handleDeleteCard = async () => {
    const cardId = {
      id: data?.[currentIndex]?.id,
    };
    await deleteCard(cardId);
    toast.success("Card deleted successfully");
    setIsRemoveDialogOpen(false);
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
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger
            className="dialog-trigger edit"
            onClick={openEditDialog}
          >
            Edit
          </DialogTrigger>
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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger
            className="dialog-trigger add"
            onClick={() => setIsAddDialogOpen(true)}
          >
            Add
          </DialogTrigger>
          <DialogContent className="dialog-content">
            <DialogHeader className="dialog-header">
              <DialogTitle className="dialog-title">Add Card</DialogTitle>
              <div className="dialog-body">
                <label className="dialog-label">Question</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Add question"
                  className="dialog-input"
                />
                <label className="dialog-label">Answer</label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Add answer"
                  className="dialog-input"
                />
                <button className="save-button" onClick={handleAddCard}>
                  Add New Card
                </button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
          <DialogTrigger
            className="dialog-trigger delete"
            onClick={() => setIsRemoveDialogOpen(true)}
          >
            Delete
          </DialogTrigger>
          <DialogContent className="dialog-content">
            <DialogHeader className="dialog-header">
              <DialogTitle className="dialog-title">Delete Card</DialogTitle>
              <div className="dialog-body">
                <DialogDescription className="dialog-desc">
                  Are you sure you want to delete this card?
                </DialogDescription>
                <button className="save-button" onClick={handleDeleteCard}>
                  Delete
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
