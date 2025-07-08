import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
// import {Button} from './Button'
import Button from '@mui/material/Button';

type Props = {
  onCreateItem: (title: string) => void
}

export const CreateItemForm = ({ onCreateItem }: Props) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const createItemHandler = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle !== '') {
      onCreateItem(trimmedTitle)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    setError(null)
  }

  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createItemHandler()
    }
  }

const buttonStyle = {
  maxWidth: "30px", 
    maxHeight: "30px", 
    minWidth: "30px", 
    minHeight: "30px",
}

  return (
      <div>
        <input className={error ? 'error' : ''}
               value={title}
               onChange={changeTitleHandler}
               onKeyDown={createItemOnEnterHandler}/>
        {/* <Button title={'+'} onClick={createItemHandler} /> */}
        <Button onClick={createItemHandler} variant="contained" style={buttonStyle}>+</Button>
        {error && <div className={'error-message'}>{error}</div>}
      </div>
  )
}