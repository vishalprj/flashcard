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

  const [state, setState] = useState({
    currentIndex: 0,
    question: "",
    answer: "",
    dialogs: {
      edit: false,
      add: false,
      remove: false,
    },
  });

  const handleNext = () => {
    if (state.currentIndex < data.length - 1) {
      setState((prev) => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
    }
  };
  const handlePrev = () => {
    if (state.currentIndex > 0) {
      setState((prev) => ({ ...prev, currentIndex: prev.currentIndex - 1 }));
    }
  };

  const openEditDialog = () => {
    setState((prev) => ({ ...prev, dialogs: { ...prev.dialogs, edit: true } }));
  };
  const openAddDialog = () => {
    setState((prev) => ({ ...prev, dialogs: { ...prev.dialogs, add: true } }));
  };
  const openRemoveDialog = () => {
    setState((prev) => ({
      ...prev,
      dialogs: { ...prev.dialogs, remove: true },
    }));
  };

  const handleEdit = () => {
    const updatedCard = {
      id: data[state.currentIndex].id,
      question: state.question,
      answer: state.answer,
    };
    updateCard(updatedCard);
    setState((prev) => ({
      ...prev,
      dialogs: { ...prev.dialogs, edit: false },
    }));
  };

  const handleAddCard = async () => {
    const newCard = {
      question: state.question,
      answer: state.answer,
    };
    addCard(newCard);
    setState((prev) => ({ ...prev, dialogs: { ...prev.dialogs, add: false } }));
  };

  const handleDeleteCard = async () => {
    const cardId = {
      id: data?.[state.currentIndex]?.id,
    };
    await deleteCard(cardId);
    toast.success("Card deleted successfully");
    setState((prev) => ({
      ...prev,
      dialogs: { ...prev.dialogs, remove: false },
    }));
  };
  if (!data) return null;

  return (
    <div className="wrapper">
      <div className="container">
        <div className="card">
          <div className="front">
            <h2>{data[state.currentIndex]?.question}</h2>
          </div>
          <div className="back">
            <h2>{data[state.currentIndex]?.answer}</h2>
          </div>
        </div>
      </div>
      <div className="btn-container">
        <button
          className="prev"
          onClick={handlePrev}
          disabled={state.currentIndex === 0}
        >
          Prev
        </button>
        <button
          className="next"
          onClick={handleNext}
          disabled={state.currentIndex === data.length - 1}
        >
          Next
        </button>
      </div>
      <div className="btn-container">
        <Dialog
          open={state.dialogs.edit}
          onOpenChange={(open) =>
            setState((prev) => ({
              ...prev,
              dialogs: { ...prev.dialogs, edit: open },
            }))
          }
        >
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
                  value={state.question}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, question: e.target.value }))
                  }
                  placeholder="Edit question"
                  className="dialog-input"
                />
                <label className="dialog-label">Answer</label>
                <input
                  type="text"
                  value={state.answer}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, answer: e.target.value }))
                  }
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
        <Dialog
          open={state.dialogs.add}
          onOpenChange={(open) =>
            setState((prev) => ({
              ...prev,
              dialogs: { ...prev.dialogs, add: open },
            }))
          }
        >
          <DialogTrigger className="dialog-trigger add" onClick={openAddDialog}>
            Add
          </DialogTrigger>
          <DialogContent className="dialog-content">
            <DialogHeader className="dialog-header">
              <DialogTitle className="dialog-title">Add Card</DialogTitle>
              <div className="dialog-body">
                <label className="dialog-label">Question</label>
                <input
                  type="text"
                  value={state.question}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, question: e.target.value }))
                  }
                  placeholder="Add question"
                  className="dialog-input"
                />
                <label className="dialog-label">Answer</label>
                <input
                  type="text"
                  value={state.answer}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, answer: e.target.value }))
                  }
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
        <Dialog
          open={state.dialogs.remove}
          onOpenChange={(open) =>
            setState((prev) => ({
              ...prev,
              dialogs: { ...prev.dialogs, remove: open },
            }))
          }
        >
          <DialogTrigger
            className="dialog-trigger delete"
            onClick={openRemoveDialog}
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
