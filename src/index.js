import React from 'react';
import ReactDOM from 'react-dom';
import {DragDropContext} from 'react-beautiful-dnd';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import Column from './column'
import initialData from './initial-data'
import {Navbar, Button} from 'react-bootstrap'
//import App from './App';

const Container= styled.div`
		display: flex;
		cell-spacing: 10px;
		cell-padding: 8px;
		border-radius: 8px;
		margin: 8px;
	`;
const NavColumns= styled.div`
		display: flex;
`;
let initialDataValue;
class App extends React.Component{
	constructor(props){
		super(props);
		initialDataValue=this.getInitialData();
		this.state= initialDataValue;
	}
	
	getInitialData=()=>{
		const completeInitialData={}
		const columnNumber=initialData.columnNumber;
		const columns={};
		const columnOrder=[];
		let i;
		for(i=1;i<=columnNumber;i++){
			let columnDef={};
			let columnDefId='column-'+i;
			columnDef.id='column-'+i;
			var tasks=[];
			if(i==1){
				columnDef.title='All Items';
				Object.keys(initialData.tasks).forEach(key =>{
					tasks.push(key);
				});
				
			}
			columnDef.taskIds=tasks;
			columns['column-'+i]=columnDef;
			columnOrder.push(columnDef.id);
		}
		completeInitialData.tasks=initialData.tasks;
		completeInitialData.columns=columns;
		completeInitialData.columnOrder=columnOrder;
		return completeInitialData;
	}
	
	resetGame=()=>{
		this.setState(initialDataValue);
	}
	
	onDragEnd = result =>{
		const {destination, source, draggableId} = result;
		if(!destination)
			return;
		if(destination.droppableId == source.droppableId && destination.index== source.index){
			return;
		}
		
		const start= this.state.columns[source.droppableId];
		const finish= this.state.columns[destination.droppableId];
		if(start === finish){
			const newTaskIds= Array.from(start.taskIds);
			newTaskIds.splice(source.index,1);
			newTaskIds.splice(destination.index,0,draggableId);
			
			const newColumn={
				...start,
				taskIds:newTaskIds,
			};
			const newState={
				...this.state,
				columns:{
					...this.state.columns,
					[newColumn.id]:newColumn,
				},
			};
			
			this.setState(newState);
			return;
		}
		const newStartIds= Array.from(start.taskIds);
		newStartIds.splice(source.index,1);
		
		const newStartColumn={
			...start,
			taskIds:newStartIds,
		};
		
		const newDestIds= Array.from(finish.taskIds);
		newDestIds.splice(destination.index,0,draggableId);
		
		const newDestColumn={
			...finish,
			taskIds:newDestIds,
		};
		
		const newState={
			...this.state,
			columns:{
				...this.state.columns,
				[newStartColumn.id]:newStartColumn,
				[newDestColumn.id]:newDestColumn,
			},
		};
		
		this.setState(newState);
		return;
	}
	
    render(){
        return (
		<div>
			<Navbar bg="dark">
				<Container>
					<NavColumns>
						<Navbar.Brand>
						  <img
							src={require('./images/A380-family-stage.jpg') }
							width="300"
							height="100"
							className="d-inline-block align-top"
						  />
						</Navbar.Brand>
					</NavColumns>
					<NavColumns>
						<Navbar.Brand>
						  <img
							src={require('./images/AirBus_logo.jpg') }
							width="300"
							height="100"
							className="d-inline-block align-top"
						  />
						</Navbar.Brand>
					</NavColumns>	
					<NavColumns>
					</NavColumns>
				</Container>
				<Container>
					<Button onClick={this.resetGame}>Reset Game</Button>
				</Container>
				<Container>
					<Button>Start Game</Button>
				</Container>
			  </Navbar>
			  
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Container>
					{this.state.columnOrder.map(columnId =>{
						const column = this.state.columns[columnId];
						const tasks= column.taskIds.map(taskId => this.state.tasks[taskId]);
						return <Column key={column.id} column={column} tasks={tasks}/>;
					})}
				</Container>
			</DragDropContext>
			<footer class="app-footer">
			  <div>
				<a href="">AirBus Enc.</a>
				<span>&copy; 2019 creativeLabs.</span>
			  </div>
			  <div class="ml-auto">
				<span>Powered by </span>
				<a href="">Skywise</a>
			  </div>
			</footer>
		</div>
		);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


