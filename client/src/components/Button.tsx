import React from 'react';
//need to import whatever css framework for the button here

import { useMutation } from '@apollo/client';
import { SAVE_FAVORITE } from '../graphql/saveFavorite';



const likeBtn = ({photo}) => {
    const [saveFavorite, { loading, error }] = useMutation(SAVE_FAVORITE);
    const handleFavorite = () => {
        const input = {
            title: photo.title,
            url: photo.url,
            date: photo.date,
            explanation: photo.explanation,
          // userId: "optional-user-id" // Add this if needed
        } 
        saveFavorite({ variables: { input } });
    };

    <Button onClick={handleFavorite} 
        disabled={loading}
        style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        transition: 'background-color 0.2s',
      }}
    >
        Like
    </Button>
}

export default likeBtn;