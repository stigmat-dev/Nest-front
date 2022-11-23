import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../constants';
import { Trash } from 'react-bootstrap-icons';
import { PlusSquare } from 'react-bootstrap-icons';
import { DashSquare } from 'react-bootstrap-icons';
import {
    decreaseCartItem,
    removeFromCart,
    increaseCartItem,
    clearCart,
    getTotals,
} from '../store/cart/reducer';
import { divOfNums } from '../utils/division-of-numbers';

export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleDeleteItem = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    };

    const handleDecreaseCartItem = (cartItem) => {
        dispatch(decreaseCartItem(cartItem));
    };

    const handleIncreaseCartItem = (cartItem) => {
        dispatch(increaseCartItem(cartItem));
    };

    const handleCartClear = () => {
        dispatch(clearCart());
    };

    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                gap: '50px',
                marginTop: '50px',
            }}
        >
            <Row>
                <Col>
                    <header>
                        <h2>Корзина</h2>
                    </header>
                </Col>
            </Row>
            <Row
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Col
                    md={10}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {cart.cartItems.length ? (
                        cart.cartItems?.map((cartItem) => {
                            return (
                                <Row
                                    key={cartItem.id}
                                    style={{
                                        paddingTop: '10px',
                                        borderBottom: '1px dotted lightgray',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <Col sm={3} md={2}>
                                        <Image
                                            style={{ height: '2rem' }}
                                            variant="top"
                                            src={`${API_URL}${cartItem.image}`}
                                            alt="Product photo"
                                        />
                                    </Col>

                                    <Col sm={3} md={4}>
                                        <p>{cartItem.name}</p>
                                    </Col>

                                    <Col sm={3} md={2}>
                                        <div className="count">
                                            <button
                                                onClick={() =>
                                                    handleDecreaseCartItem(
                                                        cartItem
                                                    )
                                                }
                                                className="count-button"
                                            >
                                                <DashSquare />
                                            </button>
                                            <span className="count_input">
                                                {cartItem.itemQuantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleIncreaseCartItem(
                                                        cartItem
                                                    )
                                                }
                                                className="count-button"
                                            >
                                                <PlusSquare />
                                            </button>
                                        </div>
                                    </Col>

                                    <Col
                                        style={{
                                            textAlign: 'end',
                                        }}
                                        sm={3}
                                        md={3}
                                    >
                                        <strong>
                                            {divOfNums(
                                                cartItem.price *
                                                    cartItem.itemQuantity
                                            )}
                                        </strong>{' '}
                                    </Col>

                                    <Col sm={3} md={1}>
                                        <button
                                            value={cartItem.id}
                                            onClick={() =>
                                                handleDeleteItem(cartItem)
                                            }
                                            className="delete-button"
                                        >
                                            <Trash />
                                        </button>
                                    </Col>
                                </Row>
                            );
                        })
                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '15px' }}>
                            <p>Корзина пустая. Начните добавлять товары.</p>
                        </div>
                    )}
                    {cart.cartItems.length ? (
                        <Row
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Col
                                md={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '40px',
                                        marginRight: '90px',
                                        marginTop: '20px',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <span>Итого:</span>
                                    <strong>
                                        {divOfNums(cart.cartTotalAmount)}
                                    </strong>
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        false
                    )}
                </Col>
            </Row>
            <Row>
                <Col
                    sm={12}
                    md={12}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',
                    }}
                >
                    <Link to="/">
                        <Button variant="outline-success">
                            Продолжить покупки
                        </Button>
                    </Link>
                    <Button variant="outline-dark" onClick={handleCartClear}>
                        Очистить корзину
                    </Button>
                    <Link to="">
                        <Button variant="success">Перейти к оформлению</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};
