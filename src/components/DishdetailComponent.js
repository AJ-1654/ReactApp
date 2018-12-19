import React, {Component} from 'react';
import { Card, CardTitle, CardImg, CardText, CardBody } from 'reactstrap';

class Dishdetail extends Component {

    constructor(props) {
        super(props);
    }

    renderComments(dish){
        if(dish!=null){
            const DishComments = this.props.currentDish.comments.map((comment) => {
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

    renderDish(dish){
        if(dish!=null)
        {
            return (
                <Card>
                    <CardImg width="100%" src = {dish.image} alt = {dish.name} />
                    <CardBody>
                        <CardTitle> {dish.name} </CardTitle>
                        <CardText> {dish.description} </CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    }

    render(){
        const dish = this.props.currentDish;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                       {this.renderDish(dish)}
                    </div> 
                        {this.renderComments(dish)}
                </div>
            </div>
        );
    }
}

export default Dishdetail;