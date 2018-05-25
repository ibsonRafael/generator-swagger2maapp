/**
 * @class <%= tag %>Effects
 *
 * @author <%=author %> <<%=email %>>
 * @copyright ???? - 2017 copyright
 */
import { createSelector } from 'reselect';

// Mais informações em:  https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
import { ActionReducer, combineReducers } from '@ngrx/store';

// Mais informações em: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
import { compose } from '@ngrx/core/compose';



import * as fromInstituicao from './reducers/instituicao.reducer';


/**
 * Tratamos cada reducer como uma tabela em um banco de dados. Isso significa
 * nossa interface de estado de nível superior é apenas um mapa de chaves para
 * os tipos de estado interno.
 */
export interface State {
    instituicao: fromInstituicao.State;
}


/**
 * Como os metareducers tomam uma função do reducer e retornam um novo reducer,
 * podemos usar nosso auxiliar de composição para encaderná-los juntos. Aqui estamos
 * usando o combineReducers para tornar nosso reducer de nível superior e
 * envolvendo ele no storeLogger. Lembre-se que compor aplica o resultado da
 * direita para a esquerda.
 */
const reducers = {
    instituicao: fromInstituicao.reducer
};


export function store(state: any, action: any) {
    const store: ActionReducer<State> = compose(combineReducers)(reducers);
    return store(state, action);
}

/**
 * Cada módulo redurcer exporta funções seletoras, no entanto os reducers filhos
 * não tem conhecimento da árvore de estado geral. Para torná-los utilizáveis, nós
 * precisa fazer novos seletores que os envolvam.
 */



/**
 * Configurações das funções de Períodos
 */
export const getPeriodoState   = (state: State) => state.instituicao;
export const getPeriodosData   = createSelector(getPeriodoState, fromInstituicao.getPeriodosData);
export const isPeriodosLoading = createSelector(getPeriodoState, fromInstituicao.isPeriodosLoading);
export const isPeriodosLoaded  = createSelector(getPeriodoState, fromInstituicao.isPeriodosLoaded);
export const isPeriodosFailed  = createSelector(getPeriodoState, fromInstituicao.isPeriodosFailed);

export const getProfissoesState  = (state: State) => state.instituicao;
export const getProfissoesData   = createSelector(getProfissoesState, fromInstituicao.getProfissoesData);
export const isProfissoesLoading = createSelector(getProfissoesState, fromInstituicao.isProfissoesLoading);
export const isProfissoesLoaded  = createSelector(getProfissoesState, fromInstituicao.isProfissoesLoaded);
export const isProfissoesFailed  = createSelector(getProfissoesState, fromInstituicao.isProfissoesFailed);

export const getCapacidadesState  = (state: State) => state.instituicao;
export const getCapacidadesData   = createSelector(getCapacidadesState, fromInstituicao.getPeriodosData);
export const isCapacidadesLoading = createSelector(getCapacidadesState, fromInstituicao.isCapacidadeLoading);
export const isCapacidadesLoaded  = createSelector(getCapacidadesState, fromInstituicao.isCapacidadeLoaded);
export const isCapacidadesFailed  = createSelector(getCapacidadesState, fromInstituicao.isCapacidadeFailed);
