import React from 'react'
import ResponsiveDialog from '../ModalDialog/Modal'

const ChooseTickets = (props) => {
  return (
    <div>
                <ResponsiveDialog  movieId={props.movieId} ></ResponsiveDialog>
    </div>
  )
}

export default ChooseTickets