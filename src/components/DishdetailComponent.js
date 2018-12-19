import React from 'react';
import { Card, CardTitle, CardImg, CardText, CardBody } from 'reactstrap';


    function RenderComments({dish}){
        if(dish!=null){
            const comments = dish.comments;
            const DishComments = comments.map((comment) => {
                return (
                    <li key = {comment.id} >
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                );
            });
            return (
                <div className = "col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">{DishComments}</ul>
                </div>
            );
        }
        else{
            return <div></div>;
        }
    }

    function RenderDish({dish}){
        if(dish!=null)
        {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src = {dish.image} alt = {dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name} </CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
        const dish = props.currentDish;
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish = {dish} /> 
                    <RenderComments dish = {dish} />
                </div>
            </div>
        );
    }

export default DishDetail;