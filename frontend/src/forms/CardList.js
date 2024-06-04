import React, { useEffect, useState } from 'react';
import "../styles/projectList.css";
import { useCardsContext } from '../hooks/useCardsContext';
import { UpdateCardForm } from './UpdateCardForm';
import { useAuthContext } from '../hooks/useAuthContext';

export const CardList = () => {
  const { cards, dispatch } = useCardsContext();
  const [updateForm, setUpdateForm] = useState(false);
  const [cardId, setCardId] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCards = async() => {
      const response = await fetch("https://joseph-lapuz.onrender.com/Admin/Cards", {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      console.log(json)

      if (response.ok) {
        dispatch({ type: "SET_CARDS", payload: json })
      }
    }

    fetchCards();
    setUpdateForm(false);
  }, [dispatch])

  const handleUpdate = async(id) =>{
    setUpdateForm(true);
    setCardId(id)
  }

  return (
    <div className="list-container">
      {!updateForm ? (
        <div className='list-wrapper'>
          {cards && cards.map((card, index) => (
            <div key={index} className='list-item'>
              <div className="title">{card.title}</div>
              <div className="buttons">
                <button onClick={() => handleUpdate(card._id)} id="update-project">Update</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <UpdateCardForm id={cardId} />
      )}
    </div>
  )
}