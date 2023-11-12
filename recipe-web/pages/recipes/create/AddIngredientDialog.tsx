import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { createProduct } from '../../../api/products.service';

interface AddIngredientDialogProps {
    isOpen: boolean,
    onClose: () => void,
    onCreated: () => void
}

const AddIngredientDialog = (props: AddIngredientDialogProps) => {
    const [ingredientName, setIngredientName] = React.useState('')
    const handleCreate = async () => {
        await createProduct(ingredientName);
        props.onCreated();
    }

    const handleChange = (event: any) => {
        setIngredientName(event.target.value);
    }

    return (
        <>
            <Dialog
                open={props.isOpen}
                onClose={props.onClose}
            >
                <DialogTitle id="alert-dialog-title">
                    Add new ingredient
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New Ingredient"
                        fullWidth
                        variant="standard"
                        autoComplete='off'
                        value={ingredientName}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button onClick={handleCreate} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddIngredientDialog;