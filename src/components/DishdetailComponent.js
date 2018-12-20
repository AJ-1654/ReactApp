import React , { Component } from 'react';
import {Modal,ModalBody,ModalHeader,Button,Label,Row, Card, CardTitle, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && ( len <= val.length);

class CommentForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        alert('Current State is: ' + JSON.stringify(values));
    }

    render(){
        return(
            <>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>{this.handleSubmit(values)}}>
                        <Row className="form-group m-1">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" name="rating" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Row>
                        <Row className="form-group m-1 mt-3">
                            <Label htmlFor="name">Your Name</Label>
                            <Control.text className="form-control" model=".name" name="name" id="name" placeholder="Your Name" validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                            <Errors className="text-danger" model=".name" show="touched"
                            messages={{ required: 'Required ',
                                        minLength: 'Must be greater than 2 characters ',
                                        maxLength: 'Must be 15 characters or less '
                                        }}/>
                        </Row>
                        <Row className="form-group m-1 mt-3">
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea rows="6" model=".comment" id="comment" name="comment" className="form-control"/>
                        </Row>
                        <Row className="form-group m-1 mt-3">
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>
        ); 
    }
}

function RenderComments({comments}){
    if(comments!=null){
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
                <CommentForm />
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
    if(props.dish!=null){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish = {props.dish} /> 
                    {props.comments?<RenderComments comments = {props.comments} />: null } 
                </div>
            </div>
        );
    }else{
        return (
            <div></div>
        );
    }
    
}

export default DishDetail;