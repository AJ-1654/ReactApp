import React, {Component} from 'react';
import { Card, CardTitle, CardImg, CardText, CardBody } from 'reactstrap';

class Dishdetail extends Component {

    constructor(props) {
        super(props);
    }

    renderComments(comments){
        if(comments!=null){
            const DishComments = this.props.currentDish.comments.map((comment) => {
                return (
                    <li key = {comment.id} >
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {comment.date}</p>
                    </li>
                );
            });
            return (
                <ul className="list-unstyled">{DishComments}</ul>
            );
        }
        else{
            return <div></div>;
        }
    }

    render(){
        const dish = this.props.currentDish;
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src = {dish.image} alt = {dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name} </CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div> 
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {this.renderComments(dish.comments)}
                </div>
            </div>
        );
    }
}

export default Dishdetail;