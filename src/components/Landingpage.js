import { Container, Button, Typography} from '@mui/material';
import { Card, CardActions, CardMedia, CardContent } from '@mui/material';

export default function Landingpage() {
return (
<Container maxWidth={false} sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
<Card sx={{ maxWidth: 345 }}>
    <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
    />
    <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
        </Typography>
    </CardContent>
    <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
    </CardActions>
    </Card>
</Container>
);
}