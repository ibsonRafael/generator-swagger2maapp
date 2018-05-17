/**
 * @class <%= tag %>Effects
 *
 * @author <%=author %> <<%=email %>>
 * @copyright MedTime - 2017 copyright
 */
import * as actions from '../actions/auth.action';
import { User }     from '../../models';

export interface State {
    loading: boolean;
    loaded:  boolean;
    failed:  boolean;
    user:    User;
};

const INITIAL_STATE: State = {
    loading:       false,
    loaded:        false,
    failed:        false,
    user:          new User()
};

export function reducer(state = INITIAL_STATE, action: actions.Actions): State
{
    if (!action) return state;
    switch (action.type) {
        default: {
            return state;
        }
    }
}

export const getLoggedUser = (state: State) => state.user;
export const isLoading     = (state: State) => state.loading;
export const isLoaded      = (state: State) => state.loaded;
export const isFailed      = (state: State) => state.failed;