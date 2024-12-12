import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Stack, Snackbar, Alert } from '@mui/material';

const UploadProduct = () => {
    const [modelId, setModelId] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState('');
    const [chipset, setChipset] = useState('');
    const [gpu, setGpu] = useState('');
    const [color, setColor] = useState('');
    const [warrantyPeriod, setWarrantyPeriod] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar open state
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result); // Set the Base64 string
            };
            reader.readAsDataURL(file); // Read the file as a data URL
            setImage(file); // Optionally store the file for any other use
        }
    };

    const handleUpload = async () => {
        const payload = {
            modelId: parseInt(modelId),
            description: description,
            price: parseFloat(price), // Ensure price is a number
            stockQuantity: parseInt(stockQuantity), // Ensure quantity is a number
            image: imageBase64, // Use the Base64 string for the image
            chipset: chipset,
            gpu: gpu,
            color: color,
            warrantyPeriod: parseInt(warrantyPeriod),
        };

        try {
            const response = await fetch("https://localhost:7295/odata/Phone", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                body: JSON.stringify(payload), // Convert the payload to JSON
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get the error message from the response
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const result = await response.json();
            console.log('Phone uploaded:', result);

            // Show success message
            setSnackbarMessage('Phone uploaded successfully!');
            setOpenSnackbar(true);
            // Optionally reset the form after a successful upload
            resetForm();
        } catch (error) {
            console.error("Error uploading phone:", error);
            setSnackbarMessage('Failed to upload phone.'); // Set error message
            setOpenSnackbar(true); // Open snackbar to show error message
        }
    };

    const resetForm = () => {
        setModelId('');
        setPrice('');
        setDescription('');
        setStockQuantity('');
        setImage(null);
        setImageBase64('');
        setChipset('');
        setGpu('');
        setColor('');
        setWarrantyPeriod('');
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); // Close snackbar
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            minWidth="170vh"
            bgcolor="#f5f5f5"
            p={3}
        >
            <Card sx={{ width: 500, padding: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Upload New Phone
                    </Typography>

                    <Stack spacing={2}>
                        <TextField
                            label="ModelId"
                            variant="outlined"
                            fullWidth
                            value={modelId}
                            onChange={(e) => setModelId(e.target.value)}
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            label="Price"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            label="StockQuantity"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(e.target.value)}
                        />

                        <Button
                            variant="outlined"
                            component="label"
                            sx={{
                                border: '1px dashed #aaa',
                                color: '#555',
                                justifyContent: 'left',
                                textTransform: 'none',
                                '&:hover': {
                                    borderColor: '#333',
                                    backgroundColor: '#f9f9f9'
                                }
                            }}
                        >
                            {image ? image.name : 'Upload Image'}
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Button>
                        <TextField
                            label="Chipset"
                            variant="outlined"
                            fullWidth
                            value={chipset}
                            onChange={(e) => setChipset(e.target.value)}
                        />
                        <TextField
                            label="Gpu"
                            variant="outlined"
                            fullWidth
                            value={gpu}
                            onChange={(e) => setGpu(e.target.value)}
                        />
                        <TextField
                            label="Color"
                            variant="outlined"
                            fullWidth
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                        <TextField
                            label="WarrantyPeriod"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={warrantyPeriod}
                            onChange={(e) => setWarrantyPeriod(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleUpload}
                            sx={{
                                padding: '12px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                backgroundColor: '#4CAF50',
                                '&:hover': {
                                    backgroundColor: '#45A049'
                                }
                            }}
                        >
                            Submit
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            {/* Snackbar for success/error messages */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UploadProduct;
